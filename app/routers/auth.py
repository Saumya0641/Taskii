from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post("/login")
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
   

    user = db.query(User).filter(
        User.email == login_data.email
    ).first()

    print("User:", user)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if user.password != login_data.password:
        print("DB Password:", user.password)

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
    }