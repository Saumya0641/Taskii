from fastapi import FastAPI

from app.database import Base,engine
from app.models.user import User
from app.models.task import Task
from app.models.task_assignment import TaskAssignment
from app.models.comment import Comment
from app.models.activity_logs import ActivityLog

from app.routers.task import router as task_router
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from app.models.task_assignment import TaskAssignment
from app.routers.user import router as user_router
from app.routers.auth import router as auth_router
from app.routers.dashboard import router as dashboard_router

from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task_router) 
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(dashboard_router)



@app.get("/")
def root():
    return {"message": "Backend Running"}