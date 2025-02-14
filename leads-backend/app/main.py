from fastapi import FastAPI
from sqlmodel import SQLModel
from app.router import router
from app.db import create_db_and_tables

create_db_and_tables()

app = FastAPI()

@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(router, prefix="/leads", tags=["leads"])