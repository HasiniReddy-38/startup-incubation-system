from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base


class FundingOpportunity(Base):
    __tablename__ = "funding_opportunities"

    id = Column(Integer, primary_key=True, index=True)

    investor_id = Column(
        Integer,
        ForeignKey("investor_profiles.id")
    )

    title = Column(String(255))
    sector = Column(String(100))
    amount = Column(String(50))
    stage = Column(String(50))