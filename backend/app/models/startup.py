from sqlalchemy import Column, Integer, String, ForeignKey, Text
from app.core.database import Base


class StartupProfile(Base):
    __tablename__ = "startup_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    company_name = Column(String(100))
    industry = Column(String(100))
    stage = Column(String(50))
    funding_required = Column(String(50))
    description = Column(Text)
    location = Column(String(100))
    website = Column(String(255))
    pitch_deck_url = Column(String(255))