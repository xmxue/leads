from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select
from datetime import datetime, date


class Lead(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    email: str
    company: str
    stage: int = Field(default=0, nullable=False)
    engaged: bool = Field(default=False)
    last_contacted: date = Field(default_factory=lambda: date.today())
    created_at: str = Field(default_factory=lambda: datetime.now())
    updated_at: str = Field(default_factory=lambda: datetime.now())


db_url = "postgresql://postgres:password@localhost:5432/postgres"
engine = create_engine(db_url)