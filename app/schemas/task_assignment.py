from pydantic import BaseModel


class TaskAssign(BaseModel):
    user_ids: list[int]