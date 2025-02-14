from io import BytesIO
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from api.leads_router import router
from api.db import create_db_and_tables
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from starlette.datastructures import MutableHeaders
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, style="{", format="{levelname} {message}")
logger = logging.getLogger(__name__)

create_db_and_tables()

app = FastAPI()


# Middleware to log request and response
class LogRequestResponseMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Log request headers and body
        request_body = await request.body()
        logger.info(f"Request URL: {request.url}")
        logger.info(f"Request Body: {request_body.decode('utf-8')}")

        
        # if request headers does not include content-type, set it to application/json
        headers = MutableHeaders(request.headers)
        headers["content-type"] = "application/json"
        headers["content-length"] = str(len(request_body))
        request._headers = headers
        logger.info(f"Request Headers: {request.headers}")

        # Call the next middleware or the route handler
        response = await call_next(request)

        # Capture and log the response body and headers
        logger.info(f"Response Status Code: {response.status_code}")
        logger.info(f"Response Headers: {response.headers}")

        return response

app.add_middleware(LogRequestResponseMiddleware)

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