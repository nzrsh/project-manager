from sqlmodel import create_engine, Session
from app.config import settings


engine = create_engine(settings.DATABASE_URL)



def get_db():
    with Session(engine) as session:
        yield session