from pydantic import BaseModel
from datetime import datetime
from typing import Literal


class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    priority: str = "MEDIUM"
    deadline: datetime | None = None

class TaskUpdate(BaseModel):
    title: str
    description: str | None = None
    priority: str
    deadline: datetime | None = None


class TaskStatusUpdate(BaseModel):
    status: Literal[
        "TODO",
        "IN_PROGRESS",
        "UNDER_REVIEW",
        "COMPLETED",
        "BLOCKED"
    ]


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None
    status: str
    priority: str

    class Config:
        from_attributes = True