from fastapi import APIRouter, Body, Depends, HTTPException, Path, Query, status
from sqlmodel import Session
from sqlalchemy.exc import SQLAlchemyError
from typing import List
from app.models.projects import Project, Process
from app.schemas.projects import ProcessUpdateStage, ProcessUpdateState, ProjectCreate, ProjectRead, ProjectUpdate, ProcessRead
from app.database import get_db
from app.crud.projects import (
    create_project, get_project_with_processes_by_id, get_projects,  update_project_by_id, delete_project_by_id,
 update_process_state, update_process_stage
)

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

@router.get(
    "/projects/{project_id}",
    summary="Получение проекта по его ID",
    description="Возвращает проект по его идентификатору вместе с его процессами. Если проект не найден, возвращает ошибку 404.",
    response_model=ProjectRead,
    response_description="Запрошенный проект с процессами",
)
def read_project(
    project_id: int = Path(..., description="Идентификатор запрашиваемого проекта"),
    db: Session = Depends(get_db),
):
    try:
        project = get_project_with_processes_by_id(db, project_id)
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



# Обновление состояния процесса
@router.patch(
    "/processes/{process_id}/state",
    summary="Обновление состояния процесса",
    description="Обновляет состояние процесса (включен/выключен). Если процесс не найден, возвращает ошибку 404.",
    response_model=ProcessRead,
    response_description="Обновленный процесс",
)
def update_process_active_state(
    process_id: int = Path(..., description="Идентификатор процесса"),
    process_update: ProcessUpdateState = Body(..., description="Данные для обновления состояния процесса"),
    db: Session = Depends(get_db),
):
    try:
        process = update_process_state(db, process_id, process_update.is_active)
        if not process:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Процесс не найден.",
            )
        return process
    except SQLAlchemyError as e:
        print(f"Ошибка при обновлении состояния процесса: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Не удалось обновить состояние процесса из-за ошибки базы данных.",
        )

# Обновление этапа состояния процесса
@router.patch(
    "/processes/{process_id}/stage",
    summary="Обновление этапа состояния процесса",
    description="Обновляет этап состояния процесса (от 0 до 3). Если процесс не найден, возвращает ошибку 404.",
    response_model=ProcessRead,
    response_description="Обновленный процесс",
)
def update_process_stage_state(
    process_id: int = Path(..., description="Идентификатор процесса"),
    process_update: ProcessUpdateStage = Body(..., description="Данные для обновления этапа состояния процесса"),
    db: Session = Depends(get_db),
):
    try:
        process = update_process_stage(db, process_id, process_update.state_stage)
        if not process:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Процесс не найден.",
            )
        return process
    except SQLAlchemyError as e:
        print(f"Ошибка при обновлении этапа состояния процесса: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Не удалось обновить этап состояния процесса из-за ошибки базы данных.",
        )