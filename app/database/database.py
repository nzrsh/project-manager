from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel.ext.asyncio.session import AsyncSession 
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
from app.config.config import Settings
from typing import AsyncGenerator

# Создание асинхронного движка
engine = create_async_engine(Settings.DATABASE_URL, echo=True, future=True) #Создаём асинхронный движок с выводом в консоль 

# Создание асинк сессии, выключаем блокировку после коммита
async_session_maker = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# Получение сессии для работы с базой данных
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session

# Инициализация базы данных (создание всех таблиц)
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

