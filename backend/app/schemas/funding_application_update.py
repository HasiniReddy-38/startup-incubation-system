from pydantic import BaseModel

class FundingApplicationUpdate(BaseModel):
    status: str