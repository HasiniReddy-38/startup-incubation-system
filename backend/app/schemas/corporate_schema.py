from pydantic import BaseModel

class CorporateCreate(BaseModel):
    user_id: int
    organization_name: str
    industry: str
    problem_domain: str
    location: str