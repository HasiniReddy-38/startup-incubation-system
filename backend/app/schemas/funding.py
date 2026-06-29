from pydantic import BaseModel


class FundingCreate(BaseModel):
    investor_id: int
    title: str
    sector: str
    amount: str
    stage: str