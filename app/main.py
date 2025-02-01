from fastapi import FastAPI, HTTPException
from sqlmodel import SQLModel
import uvicorn
from app.api.projects import router as projects_router 
from app.database import engine 

app = FastAPI( title="Мененджер проектов",
    description="API сервер, предоставляющий функционал управления проектами и их процессами",
    version="0.0.1",
    contact={
        "name": "nzrsh",
        "email": "thelithium02@gmail.com",
    },
    )

app.include_router(projects_router, prefix="/api")

SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    uvicorn.run("main:app")
