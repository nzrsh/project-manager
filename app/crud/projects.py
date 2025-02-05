from datetime import datetime, timezone
from sqlmodel import Session, select
from sqlalchemy.exc import SQLAlchemyError
from typing import List, Optional
from app.models.projects import Project, Process
from app.schemas.projects import ProjectCreate, ProjectRead, ProjectUpdate
from app.config.config import Settings


def create_project(db: Session, project: ProjectCreate) -> Project:
    try:
        # Создаем проект
        db_project = Project(**project.model_dump())
        db.add(db_project)
        db.commit()
        db.refresh(db_project)


        # Создаем 4 процесса для проекта
        for name in Settings.PROCESS_NAMES:
            process = Process(
                title=name,  # Название процесса
                is_active=False,  # Процесс неактивен по умолчанию
                state_stage=0,  # Этап состояния равен 0 по умолчанию
                project_id=db_project.id  # Связь с проектом
            )
            db.add(process)

        db.commit()  # Сохраняем процессы в базе данных
        db.refresh(db_project)  # Обновляем проект, чтобы он включал процессы
        return db_project
    except SQLAlchemyError as e:
        db.rollback()  # Откатываем изменения в случае ошибки
        raise e

def get_projects(db: Session, skip: int = 0, limit: int = 100) -> List[Project]:
    try:
        statement = select(Project).offset(skip).limit(limit)
        return db.exec(statement).all()
    except SQLAlchemyError as e:
        raise e

def get_project_with_processes_by_id(db: Session, project_id: int) -> Project:
    try:
        # Получаем проект
        project = db.get(Project, project_id)
        if project:
            # Явно загружаем процессы для этого проекта
            project.processes = db.exec(select(Process).where(Process.project_id == project_id)).all()
        return project
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

def update_project_by_id(db: Session, project_id: int, project: ProjectUpdate) -> Project:
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

# Процессы
def get_processes_by_project_id(db: Session, project_id: int) -> List[Process]:
    try:
        statement = select(Process).where(Process.project_id == project_id)
        return db.exec(statement).all()
    except SQLAlchemyError as e:
        raise e

def update_process_state(db: Session, process_id: int, is_active: bool) -> Process:
    try:
        process = db.get(Process, process_id)
        if process:
            process.is_active = is_active
            process.project.updated_at = datetime.now(timezone.utc)
            db.add(process)
            db.commit()
            db.refresh(process)
        return process
    except SQLAlchemyError as e:
        db.rollback()
        raise e

def update_process_stage(db: Session, process_id: int, state_stage: int) -> Process:
    try:
        process = db.get(Process, process_id)
        if process:
            process.state_stage = state_stage
            process.project.updated_at = datetime.now(timezone.utc)
            db.add(process)
            db.commit()
            db.refresh(process)
        return process
    except SQLAlchemyError as e:
        db.rollback()
        raise e