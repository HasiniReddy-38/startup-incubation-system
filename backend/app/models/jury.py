from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base

class JuryProfile(Base):
    __tablename__ = "jury_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    name = Column(String(100))
    organization = Column(String(100))
    expertise = Column(String(100))
    experience_years = Column(Integer)