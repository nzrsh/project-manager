from datetime import datetime, timezone
from sqlmodel import SQLModel, Field

class Project(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    title: str 
    description: str
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

