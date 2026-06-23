from sqlalchemy import Column, Integer, String, ForeignKey, Text
from app.core.database import Base


class Proposal(Base):
    __tablename__ = "proposals"

    id = Column(Integer, primary_key=True, index=True)

    challenge_id = Column(
        Integer,
        ForeignKey("challenges.id")
    )

    startup_id = Column(
        Integer,
        ForeignKey("startup_profiles.id")
    )

    solution_description = Column(Text)
    github_link = Column(String(255))
    pitch_deck_url = Column(String(255))