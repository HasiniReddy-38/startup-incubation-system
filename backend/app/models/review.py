from sqlalchemy import Column, Integer, ForeignKey
from app.core.database import Base

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)

    proposal_id = Column(
        Integer,
        ForeignKey("proposals.id")
    )

    jury_id = Column(
        Integer,
        ForeignKey("jury_profiles.id")
    )

    innovation_score = Column(Integer)
    feasibility_score = Column(Integer)
    impact_score = Column(Integer)
    total_score = Column(Integer)