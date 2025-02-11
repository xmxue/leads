from fastapi import FastAPI
from sqlmodel import SQLModel
from app.router import router
from app.db import engine

app = FastAPI()

SQLModel.metadata.create_all(engine)

@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(router, prefix="/leads", tags=["leads"])