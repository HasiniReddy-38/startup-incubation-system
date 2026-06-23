from pydantic import BaseModel


class InvestorCreate(BaseModel):
    user_id: int
    firm_name: str
    preferred_sector: str
    min_investment: str
    max_investment: str
    location: str


class InvestorResponse(BaseModel):
    id: int
    user_id: int
    firm_name: str
    preferred_sector: str
    min_investment: str
    max_investment: str
    location: str

    class Config:
        from_attributes = True