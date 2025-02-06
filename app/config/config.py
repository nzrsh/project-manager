class Settings:
    DATABASE_URL = "sqlite+aiosqlite:///projects.db"
    PROCESS_NAMES: list = ["Process 1", "Process 2", "Process 3", "Process 4"]

settings = Settings()