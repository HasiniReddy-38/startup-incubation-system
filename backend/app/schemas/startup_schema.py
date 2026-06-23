from pydantic import BaseModel


class StartupCreate(BaseModel):
    user_id: int
    company_name: str
    industry: str
    stage: str
    funding_required: str
    description: str
    location: str
    website: str
    pitch_deck_url: str


class StartupResponse(BaseModel):
    id: int
    user_id: int
    company_name: str
    industry: str
    stage: str
    funding_required: str
    description: str
    location: str
    website: str
    pitch_deck_url: str

    class Config:
        from_attributes = True