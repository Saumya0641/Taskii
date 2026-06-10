from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.task import Task
from app.models.user import User

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/admin")
def admin_dashboard(
    db: Session = Depends(get_db)
):
    total_tasks = db.query(Task).count()

    completed_tasks = db.query(Task).filter(
        Task.status == "COMPLETED"
    ).count()

    in_progress_tasks = db.query(Task).filter(
        Task.status == "IN_PROGRESS"
    ).count()

    todo_tasks = db.query(Task).filter(
        Task.status == "TODO"
    ).count()

    total_users = db.query(User).count()

    return {
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "in_progress_tasks": in_progress_tasks,
        "todo_tasks": todo_tasks,
        "total_users": total_users
    }