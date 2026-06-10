from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.database import Base


class TaskAssignment(Base):
    __tablename__ = "task_assignments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    task_id = Column(
        Integer,
        ForeignKey("tasks.id"),
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    assigned_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )