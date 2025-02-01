from fastapi import APIRouter, Body, Depends, HTTPException, Path, Query, status
from sqlmodel import Session, select
from sqlalchemy.exc import SQLAlchemyError
from typing import List
from app.models.projects import Project
from app.schemas.projects import ProjectCreate, ProjectRead, ProjectUpdate
from app.database import get_db
from app.crud.projects import create_project, get_projects, get_project_by_id, update_project_by_id, delete_project_by_id

router = APIRouter(tags=["Проекты"])

# Получение списка проектов
@router.get(
    "/projects/",
    summary="Получение списка проектов",
    description="Возвращает список проектов с возможностью пагинации. "
                "Используйте параметры `skip` и `limit` для управления количеством возвращаемых записей.",
    response_model=List[ProjectRead],
    response_description="Список проектов",
)
def read_projects(
    skip: int = Query(0, description="Количество пропущенных записей (пагинация)"),
    limit: int = Query(10, description="Количество возвращаемых записей (пагинация)"),
    db: Session = Depends(get_db),
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
@router.get(
    "/projects/{project_id}",
    summary="Получение проекта по его ID",
    description="Возвращает проект по его идентификатору. Если проект не найден, возвращает ошибку 404.",
    response_model=ProjectRead,
    response_description="Запрошенный проект",
)
def read_project(
    project_id: int = Path(..., description="Идентификатор запрашиваемого проекта"),
    db: Session = Depends(get_db),
):
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

# Создание проекта
@router.post(
    "/projects/",
    summary="Создание проекта",
    description="Создает новый проект на основе переданных данных. Возвращает созданный проект.",
    response_model=ProjectRead,
    response_description="Созданный проект",
)
def create_new_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
):
    try:
        return create_project(db, project)
    except SQLAlchemyError as e:
        print(f"Ошибка при создании проекта: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Не удалось создать проект из-за ошибки базы данных.",
        )

# Удаление проекта по ID
@router.delete(
    "/projects/{project_id}",
    summary="Удаление проекта по ID",
    description="Удаляет проект по его идентификатору. Если проект не найден, возвращает ошибку 404.",
    response_model=ProjectRead,
    response_description="Удаленный проект",
)
def delete_project(
    project_id: int = Path(..., description="Идентификатор удаляемого проекта"),
    db: Session = Depends(get_db),
):
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
@router.patch(
    "/projects/{project_id}",
    summary="Обновление проекта по ID",
    description="Обновляет данные проекта по его идентификатору. Если проект не найден, возвращает ошибку 404.",
    response_model=ProjectRead,
    response_description="Обновленный проект",
)
def update_project(
    project_id: int = Path(..., description="Идентификатор проекта, который нужно обновить"),
    project: ProjectUpdate = Body(..., description="Данные для обновления проекта"),
    db: Session = Depends(get_db),
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