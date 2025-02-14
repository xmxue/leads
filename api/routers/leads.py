from datetime import date
from fastapi import APIRouter, Query
from pydantic import BaseModel
from sqlmodel import Session, select, desc, col, or_, func
from api.db.models import Lead
from api.db.utils import engine

router = APIRouter()

class LeadInfo(BaseModel):
    id: int
    name: str
    email: str
    company: str
    stage: int
    engaged: bool
    last_contacted: date

class ListLeadsResponse(BaseModel):
    leads: list[LeadInfo]
    total_count: int

@router.get("/")
async def list_leads(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, le=100),
    search: str = Query(None),
    sort_by: str = Query(None, enum=["stage"]),
    sort_order: str = Query(None, enum=["asc", "desc"]),
    secondary_sort_by: str = Query(None, enum=["last_contacted"]),
    secondary_sort_order: str = Query(None, enum=["asc", "desc"]),
) -> ListLeadsResponse:
    with Session(engine) as session:
        query = select(Lead)
        if search:
            query = query.where(or_(
                col(Lead.company).contains(search),
                col(Lead.email).contains(search),
                col(Lead.name).contains(search),
            ))

        total_count = session.scalar(select(func.count()).select_from(query.subquery()))
        if not total_count:
            raise ValueError("Could not fetch leads")
        offset = (page - 1) * page_size
        query = query.offset(offset).limit(page_size)

        if sort_by:
            if sort_order == "asc":
              query = query.order_by(getattr(Lead, sort_by))
            else:
              query = query.order_by(desc(getattr(Lead, sort_by)))
        
        if secondary_sort_by:
            if secondary_sort_order == "asc":
              query = query.order_by(getattr(Lead, secondary_sort_by))
            else:
              query = query.order_by(desc(getattr(Lead, secondary_sort_by)))

        data = session.exec(query.order_by(desc(Lead.created_at))).all()


    leads = [LeadInfo(id=lead.id, name=lead.name, email=lead.email, company=lead.company, stage=lead.stage, engaged=lead.engaged, last_contacted=lead.last_contacted) for lead in data]

    return ListLeadsResponse(leads=leads, total_count=total_count)

class LeadCreateInfo(BaseModel):
    name: str
    email: str
    company: str

@router.post("/", status_code=201)
async def create_lead(data: LeadCreateInfo) -> int:
    with Session(engine) as session:
        lead = Lead(name=data.name, email=data.email, company=data.company)
        session.add(lead)
        session.commit()
        session.refresh(lead)

    if not lead or not lead.id:
        raise ValueError("Lead creation failed")
     
    return lead.id

class LeadUpdateInfo(BaseModel):
    stage: int
    engaged: bool
    last_contacted: date

@router.patch("/{lead_id}")
async def update_lead(lead_id: int, data: LeadUpdateInfo) -> None:
    with Session(engine) as session:
        lead = session.get(Lead, lead_id)
        if not lead:
            raise ValueError("Lead not found")
        
        lead.stage = data.stage
        lead.engaged = data.engaged
        lead.last_contacted = data.last_contacted

        session.add(lead)
        session.commit()


@router.delete("/{lead_id}", status_code=204)
async def delete_lead(lead_id: int) -> None:
    with Session(engine) as session:
        lead = session.get(Lead, lead_id)
        if not lead:
            raise ValueError("Lead not found")
        
        session.delete(lead)
        session.commit()
