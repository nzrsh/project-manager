from datetime import datetime, timezone
from typing import List, Optional
from sqlmodel import SQLModel, Field, Relationship


class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str  # Название проекта
    description: str  # Описание проекта
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    # Связь с процессами
    processes: List["Process"] = Relationship(back_populates="project", cascade_delete=True)


class Process(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str  # Название процесса
    is_active: bool  # Состояние 
    state_stage: int # Этап
    project_id: Optional[int] = Field(
        default=None,
        foreign_key="project.id",
        ondelete="CASCADE"  # Каскадное удаление
    )
    project: Optional[Project] = Relationship(back_populates="processes")



