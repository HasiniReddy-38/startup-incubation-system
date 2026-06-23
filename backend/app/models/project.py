from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String, nullable=False)
    startup_name = Column(String, nullable=False)
    status = Column(String, default="Active")
    progress = Column(String, default="10%")
    description = Column(Text, nullable=True)