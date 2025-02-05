from fastapi import FastAPI, HTTPException
from sqlmodel import SQLModel
import uvicorn
from app.api.projects import router as projects_router 
from app.database import engine 
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI( title="Мененджер проектов",
    description="API сервер, предоставляющий функционал управления проектами и их процессами",
    version="0.0.1",
    contact={
        "name": "nzrsh",
        "email": "thelithium02@gmail.com",
    },
    )

app.include_router(projects_router, prefix="/api")

# Добавляем middleware для CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешенные источники (используйте "*" для разрешения всех)
    allow_credentials=True,  # Разрешить передачу учетных данных (например, cookies)
    allow_methods=["*"],  # Разрешенные методы HTTP
    allow_headers=["*"],  # Разрешенные заголовки
)

SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    uvicorn.run("main:app")
