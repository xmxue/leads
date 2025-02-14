import os
from sqlmodel import  SQLModel, create_engine

engine = create_engine(os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/test"))

def create_db_and_tables():
  SQLModel.metadata.create_all(engine)
