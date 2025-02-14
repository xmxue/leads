
from sqlmodel import Field, SQLModel
from datetime import datetime, date

class Lead(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    email: str
    company: str
    stage: int = Field(default=0, nullable=False)
    engaged: bool = Field(default=False)
    last_contacted: date = Field(default_factory=lambda: date.today())
    created_at: datetime = Field(default_factory=lambda: datetime.now())
    updated_at: datetime = Field(default_factory=lambda: datetime.now())
