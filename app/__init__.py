from .config.config import settings  # Импорт настроек
from .database.database import engine, get_db  # Импорт базы данных
from .models import Project  # Импорт моделей
from .schemas.projects import ProjectCreate, ProjectRead  # Импорт схем
from .crud.projects import create_project  # Импорт CRUD-функций
from .api.projects import router as projects_router  # Импорт роутера