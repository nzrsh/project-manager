from datetime import datetime, timezone
from sqlmodel import Session, select
from sqlalchemy.exc import SQLAlchemyError
from typing import List
from app.models.projects import Project
from app.schemas.projects import ProjectCreate, ProjectRead, ProjectUpdate

def create_project(db: Session, project: ProjectCreate) -> Project:
    try:
        db_project = Project(**project.model_dump())
        db.add(db_project)
        db.commit()
        db.refresh(db_project)
        return db_project
    except SQLAlchemyError as e:
        db.rollback()
        raise e

def get_projects(db: Session, skip: int = 0, limit: int = 100) -> List[Project]:
    try:
        statement = select(Project).offset(skip).limit(limit)
        return db.exec(statement).all()
    except SQLAlchemyError as e:
        raise e

def get_project_by_id(db: Session, project_id: int) -> Project:
    try:
        return db.get(Project, project_id)
    except SQLAlchemyError as e:
        raise e

def delete_project_by_id(db: Session, project_id: int) -> Project:
    try:
        project = db.get(Project, project_id)
        if project:
            db.delete(project)
            db.commit()
        return project
    except SQLAlchemyError as e:
        db.rollback()
        raise e

def update_project_by_id(
    db: Session, project_id: int, project: ProjectUpdate
) -> Project:
    try:
        db_project = db.get(Project, project_id)
        if db_project:
            project_data = project.model_dump(exclude_unset=True)
            for key, value in project_data.items():
                setattr(db_project, key, value)
            db_project.updatedAt = datetime.now(timezone.utc)
            db.add(db_project)
            db.commit()
            db.refresh(db_project)
        return db_project
    except SQLAlchemyError as e:
        db.rollback()
        raise e