# app/models/funding_application.py

from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base


class FundingApplication(Base):
    __tablename__ = "funding_applications"

    id = Column(Integer, primary_key=True, index=True)

    funding_id = Column(
        Integer,
        ForeignKey("funding_opportunities.id")
    )

    startup_id = Column(
        Integer,
        ForeignKey("startup_profiles.id")
    )

    status = Column(
        String(50),
        default="Pending"
    )