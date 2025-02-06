from fastapi import FastAPI, Depends
from sqlmodel import SQLModel
import uvicorn
from app.api.projects import router as projects_router
from app.database import engine, init_db  # Импортируем асинхронный движок и init_db
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config.config import Settings

# Используем lifespan для асинхронного создания таблиц при старте приложения
@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()  # Инициализируем БД при старте
    yield

app = FastAPI(
    title="Менеджер проектов",
    description="API сервер, предоставляющий функционал управления проектами и их процессами",
    version="0.0.2",
    contact={
        "name": "nzrsh",
        "email": "thelithium02@gmail.com",
    },
    lifespan=lifespan,  # Асинхронная инициализация с помощью lifespan
)

# Подключаем маршруты для работы с проектами
app.include_router(projects_router, prefix="/api")

# Добавляем middleware для CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешенные источники (используйте "*" для разрешения всех)
    allow_credentials=True,  # Разрешить передачу учетных данных (например, cookies)
    allow_methods=["*"],  # Разрешенные методы HTTP
    allow_headers=["*"],  # Разрешенные заголовки
)

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
