from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select
from datetime import datetime


class Lead(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    email: str
    company: str
    stage: int = Field(default=0)
    engaged: bool = Field(default=False)
    last_contacted: str = Field(default_factory=lambda: datetime.now())
    created_at: str = Field(default_factory=lambda: datetime.now())
    updated_at: str = Field(default_factory=lambda: datetime.now())


db_url = "postgresql://postgres:password@localhost:5432/postgres"
engine = create_engine(db_url)