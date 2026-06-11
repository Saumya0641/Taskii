from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User


from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserUpdate
)

from app.security import hash_password
from app.dependencies import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# CREATE USER

@router.post("/", response_model=UserResponse)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        role="MEMBER"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# GET ALL USERS
@router.get("/", response_model=list[UserResponse])
def get_users(
    db: Session = Depends(get_db)
):
    return db.query(User).all()


# MEMBER DASHBOARD ROUTE
@router.get("/my-tasks")
def get_my_tasks(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tasks = []

    for assignment in current_user.assignments:

        task = assignment.task

        tasks.append({
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "status": task.status,
            "priority": task.priority,
            "deadline": task.deadline
        })

    return tasks


# GET TASKS OF SPECIFIC USER
@router.get("/{user_id}/tasks")
def get_user_tasks(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    tasks = []

    for assignment in user.assignments:

        task = assignment.task

        tasks.append({
            "id": task.id,
            "title": task.title,
            "status": task.status,
            "priority": task.priority
        })

    return tasks


# GET USER BY ID
@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


# UPDATE USER
@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    user_data: UserUpdate,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.name = user_data.name
    user.email = user_data.email
    user.role = user_data.role

    db.commit()
    db.refresh(user)

    return user


# DELETE USER
@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.role == "ADMIN":
        raise HTTPException(
            status_code=400,
            detail="Admin cannot be deleted"
        )

    db.delete(user)
    db.commit()

    return {
        "message": "User deleted successfully"
    }