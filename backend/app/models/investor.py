from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base


class InvestorProfile(Base):
    __tablename__ = "investor_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    firm_name = Column(String(100))
    preferred_sector = Column(String(100))
    min_investment = Column(String(50))
    max_investment = Column(String(50))
    location = Column(String(100))