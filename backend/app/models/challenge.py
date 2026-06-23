from sqlalchemy import Column, Integer, String, ForeignKey, Text
from app.core.database import Base

class Challenge(Base):
    __tablename__ = "challenges"

    id = Column(Integer, primary_key=True, index=True)
    corporate_id = Column(Integer, ForeignKey("corporate_profiles.id"))

    title = Column(String(255))
    description = Column(Text)
    domain = Column(String(100))
    reward = Column(String(50))