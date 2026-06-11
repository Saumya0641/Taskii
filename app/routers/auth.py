from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest
from app.security import verify_password
from app.security import (
    verify_password,
    create_access_token
)

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

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        login_data.password,
        user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # return {
    #     "id": user.id,
    #     "name": user.name,
    #     "email": user.email,
    #     "role": user.role
    # }

    token = create_access_token(
    {
        "user_id": user.id,
        "role": user.role
    }

    
   )
    return {
    "access_token": token,
    "token_type": "bearer",
    "user": {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
    }
}
    

   
