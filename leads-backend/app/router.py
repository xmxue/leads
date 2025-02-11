from fastapi import APIRouter
from pydantic import BaseModel
from sqlmodel import Session, select
from app.db import engine, Lead

router = APIRouter()

class ListLeadsResponse(BaseModel):
    leads: list[Lead]
    

@router.get("/list")
async def list_leads() -> ListLeadsResponse:
    with Session(engine) as session:
        statement = select(Lead)
        results = session.exec(statement)
        response = ListLeadsResponse(leads=results.all())

    return response

class CreateLeadResponse(BaseModel):
    id: int

class CreateLeadRequest(BaseModel):
    name: str
    email: str
    company: str

@router.post("/create")
async def create_lead(request: CreateLeadRequest) -> CreateLeadResponse:
    with Session(engine) as session:
        lead = Lead(name=request.name, email=request.email, company=request.company)
        session.add(lead)
        session.commit()
        session.refresh(lead)
    return CreateLeadResponse(id=lead.id)


@router.put("/update")
async def update_lead():
    return {"message": "Lead updated successfully"}

@router.delete("/delete")
async def delete_lead():
    return {"message": "Lead deleted successfully"}