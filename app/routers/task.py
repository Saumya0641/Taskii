from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskResponse,TaskUpdate, TaskStatusUpdate
from app.schemas.task_assignment import TaskAssign
from app.models.task_assignment import TaskAssignment
from app.models.user import User
from fastapi import HTTPException

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

@router.post("/", response_model=TaskResponse)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db)
):
    new_task = Task(
        title=task.title,
        description=task.description,
        priority=task.priority,
        deadline=task.deadline,
        created_by=task.created_by
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task

@router.get("/", response_model=list[TaskResponse])
def get_tasks(
    db: Session = Depends(get_db)
):
    tasks = db.query(Task).all()

    return tasks

@router.get("/{task_id}", response_model=TaskResponse)
def get_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return task

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.title = task_data.title
    task.description = task_data.description
    task.priority = task_data.priority
    task.deadline = task_data.deadline

    db.commit()
    db.refresh(task)

    return task


@router.post("/{task_id}/assign")
def assign_users(
    task_id: int,
    assignment: TaskAssign,
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    for user_id in assignment.user_ids:
        task_assignment = TaskAssignment(
            task_id=task_id,
            user_id=user_id
        )

        db.add(task_assignment)

    db.commit()

    return {
        "message": "Users assigned successfully"
    }


@router.get("/{task_id}/members")
def get_task_members(
    task_id: int,
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    assignments = db.query(TaskAssignment).filter(
        TaskAssignment.task_id == task_id
    ).all()

    members = []

    for assignment in assignments:
        user = db.query(User).filter(
            User.id == assignment.user_id
        ).first()

        if user:
            members.append({
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role
            })

    return members

@router.patch("/{task_id}/status")
def update_task_status(
    task_id: int,
    status_data: TaskStatusUpdate,
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.status = status_data.status

    db.commit()
    db.refresh(task)

    return {
        "message": "Status updated successfully",
        "status": task.status
    }