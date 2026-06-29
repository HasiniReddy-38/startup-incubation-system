# app/schemas/funding_application.py

from pydantic import BaseModel


class FundingApplicationCreate(BaseModel):
    funding_id: int
    startup_id: int