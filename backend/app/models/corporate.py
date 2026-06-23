from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base

class CorporateProfile(Base):
    __tablename__ = "corporate_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    organization_name = Column(String(100))
    industry = Column(String(100))
    problem_domain = Column(String(255))
    location = Column(String(100))