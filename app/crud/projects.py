from datetime import datetime, timezone
from sqlmodel import select
from typing import List, Optional
from app.models.projects import Project, Process
from app.schemas.projects import ProjectCreate, ProjectUpdate
from app.config.config import Settings
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import selectinload, joinedload 
from sqlalchemy.orm import selectinload
from sqlalchemy.orm.exc import NoResultFound  

async def create_project(db: AsyncSession, project: ProjectCreate) -> Project:
    try:
        # Создаем проект и добавляем его в сессию
        db_project = Project(**project.model_dump())
        db.add(db_project)
        
        # Выполняем flush (вставку без коммита), чтобы получить id проекта
        await db.flush()
        
        # Создание процессов для проекта
        for name in Settings.PROCESS_NAMES:
            process = Process(
                title=name,  
                is_active=False,  
                state_stage=0,  
                project_id=db_project.id
            )
            db.add(process)
        
        # Выполняем коммит, чтобы сохранить все изменения
        await db.commit()
        
        # Обновляем проект с актуальными данными, включая процессы, чтобы вернуть его пользователю
        statement = select(Project).options(selectinload(Project.processes)).where(Project.id == db_project.id)
        result = await db.exec(statement)
        db_project = result.one()
        return db_project
    
    except Exception as e:
        #Если ошибка возникла в процессе транзакции
        if db.in_transaction():
            await db.rollback()
        raise e
    
async def get_projects(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[Project]:
    try:
        # Используем selectinload для загрузки связанных процессов
        statement = (
            select(Project)
            .options(selectinload(Project.processes))  # Явная загрузка процессов
            .order_by(Project.id)
            .offset(skip) # Сколько пропустить от начала
            .limit(limit) # Cколько отправить максимум
        )
        result = await db.exec(statement) # Выполнить запрос
        return result.all() # all для избавления от метаданных
    except Exception as e:
        raise e

# Получение проекта с процессами
async def get_project_with_processes_by_id(db: AsyncSession, project_id: int) -> Optional[Project]:
    try:
        # Используем selectinload для загрузки связанных процессов
        statement = select(Project).options(selectinload(Project.processes)).where(Project.id == project_id)
        result = await db.exec(statement)
        return result.one_or_none()
    except Exception as e:
        raise e

# Удаление проекта по ID
async def delete_project_by_id(db: AsyncSession, project_id: int) -> Optional[Project]:
    try:
        project = await db.get(Project, project_id)
        if not project:
            raise NoResultFound(f"Project with id {project_id} not found")  
        await db.delete(project)
        await db.commit()
        return project
    except Exception as e:
        if db.in_transaction():
            await db.rollback()
        raise e

# Изменение проекта по ID
async def update_project_by_id(db: AsyncSession, project_id: int, project: ProjectUpdate) -> Optional[Project]:
    try:
        # Получаем проект с загрузкой связанных процессов
        db_project = await db.get(Project, project_id, options=[selectinload(Project.processes)])
        if not db_project:
            raise NoResultFound(f"Project with id {project_id} not found") 
        
        # Обновляем только те поля, которые были переданы
        project_data = project.model_dump(exclude_unset=True)
        if project_data:
            for key, value in project_data.items():
                setattr(db_project, key, value)
            db_project.updatedAt = datetime.now(timezone.utc)
        
        db.add(db_project)
        await db.commit()
        await db.refresh(db_project)
        return db_project
    except Exception as e:
        if db.in_transaction():
            await db.rollback()
        raise e

async def get_project_with_processes_by_id(db: AsyncSession, project_id: int) -> Project:
    try:
        # Используем selectinload для загрузки связанных процессов
        statement = select(Project).options(selectinload(Project.processes)).where(Project.id == project_id)
        result = await db.exec(statement)
        project = result.one()  # Выбрасывает NoResultFound, если проект не найден
        return project
    except NoResultFound as e:
        raise e  # Передаем исключение выше

# Обновление состояния процесса
async def update_process_state(db: AsyncSession, process_id: int, is_active: bool) -> Optional[Process]:
    try:
        # Загружаем процесс вместе с проектом
        process = await db.get(Process, process_id, options=[joinedload(Process.project)])
        if not process:
            raise NoResultFound(f"Process with id {process_id} not found")  
        
        # Обновляем состояние процесса
        process.is_active = is_active
        if process.project:
            process.project.updatedAt = datetime.now(timezone.utc)
        db.add(process)
        await db.commit()
        await db.refresh(process)
        return process
    except Exception as e:
        if db.in_transaction():
            await db.rollback()
        raise e

# Обновление этапа процесса
async def update_process_stage(db: AsyncSession, process_id: int, state_stage: int) -> Optional[Process]:
    try:
        # Загружаем процесс вместе с проектом
        process = await db.get(Process, process_id, options=[joinedload(Process.project)])
        if not process:
            raise NoResultFound(f"Process with id {process_id} not found")  
        
        # Обновляем этап процесса
        process.state_stage = state_stage
        if process.project:
            process.project.updatedAt = datetime.now(timezone.utc)
        db.add(process)
        await db.commit()
        await db.refresh(process)
        return process
    except Exception as e:
        if db.in_transaction():
            await db.rollback()
        raise e