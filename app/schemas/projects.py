from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime, timezone

class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., min_length=1, max_length=500)

class ProjectRead(BaseModel):
    id: int
    title: str
    description: str
    createdAt: datetime
    updatedAt: datetime

class ProjectUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, min_length=1, max_length=500)