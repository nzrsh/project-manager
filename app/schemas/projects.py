from typing import List, Optional
from pydantic import BaseModel, Field, field_serializer
from datetime import datetime, timezone

class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., min_length=1, max_length=500)

class ProjectUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, min_length=1, max_length=500)

class ProcessRead(BaseModel):
    id: int
    title: str
    is_active: bool
    state_stage: int

class ProjectRead(BaseModel):
    id: int
    title: str
    description: str
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    processes: Optional[List[ProcessRead]] = Field(default_factory=list)

    #Кастомный сериализатор для времени
    @field_serializer('createdAt', 'updatedAt')
    def serialize_datetime(self, dt: datetime) -> str:
        return dt.strftime("%Y-%m-%d %H:%M:%S")

class ProcessUpdateState(BaseModel):
    is_active: bool  # Новое состояние процесса (включен/выключен)

class ProcessUpdateStage(BaseModel):
    state_stage: int = Field(ge=0, le=4, description="Этап состояния (от 0 до 4)")