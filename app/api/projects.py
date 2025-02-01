from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session, select
from sqlalchemy.exc import SQLAlchemyError
from typing import List
from app.models.projects import Project
from app.schemas.projects import ProjectCreate, ProjectRead, ProjectUpdate
from app.database import get_db
from app.crud.projects import create_project, get_projects, get_project_by_id, update_project_by_id, delete_project_by_id

router = APIRouter(tags=["Проекты"])

# Создание проекта
@router.post("/projects/", response_model=ProjectRead)
def create_new_project(project: ProjectCreate, db: Session = Depends(get_db)):
    """
    Тут описание
    ***описание 1***
    """
    try:
        return create_project(db, project)
    except SQLAlchemyError as e:
        print(f"Ошибка при создании проекта: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Не удалось создать проект из-за ошибки базы данных.",
        )

# Получение списка проектов
@router.get("/projects/", summary="Get a list of items", description="This endpoint returns a list of items.", response_model=list[ProjectRead])
def read_projects(
    skip: int = Query(0, description="Number of items to skip"),
    limit: int = Query(10, description="Number of items to return"),
    db: Session = Depends(get_db)
    ):
    try:
        projects = get_projects(db, skip=skip, limit=limit)
        return projects
    except SQLAlchemyError as e:
        print(f"Ошибка при получении проектов: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Не удалось получить список проектов из-за ошибки базы данных.",
        )

# Получение проекта по ID
@router.get("/projects/{project_id}", response_model=ProjectRead)
def read_project(project_id: int, db: Session = Depends(get_db)):
    try:
        project = get_project_by_id(db, project_id)
        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Проект не найден.",
            )
        return project
    except SQLAlchemyError as e:
        print(f"Ошибка при получении проекта: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Не удалось получить проект из-за ошибки базы данных.",
        )

# Удаление проекта по ID
@router.delete("/projects/{project_id}", response_model=ProjectRead)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    try:
        project = delete_project_by_id(db, project_id)
        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Проект не найден.",
            )
        return project
    except SQLAlchemyError as e:
        print(f"Ошибка при удалении проекта: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Не удалось удалить проект из-за ошибки базы данных.",
        )

# Обновление проекта по ID
@router.patch("/projects/{project_id}", response_model=ProjectRead)

def update_project(
    project_id: int, project: ProjectUpdate, db: Session = Depends(get_db)
):
    try:
        updated_project = update_project_by_id(db, project_id, project)
        if not updated_project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Проект не найден.",
            )
        return updated_project
    except SQLAlchemyError as e:
        print(f"Ошибка при обновлении проекта: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Не удалось обновить проект из-за ошибки базы данных.",
        )