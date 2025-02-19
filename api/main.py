from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.leads import router
from api.utils import create_db_and_tables

create_db_and_tables()

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(router, prefix="/leads", tags=["leads"])