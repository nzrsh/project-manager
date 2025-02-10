class Settings:
    DATABASE_URL = "sqlite+aiosqlite:///projects.db"
    PROCESS_NAMES: list = ["Разработка", "Компиляция", "Исполнение", "Верификация"]

settings = Settings()