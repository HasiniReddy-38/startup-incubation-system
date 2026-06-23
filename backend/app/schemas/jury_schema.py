from pydantic import BaseModel

class JuryCreate(BaseModel):
    user_id: int
    name: str
    organization: str
    expertise: str
    experience_years: int