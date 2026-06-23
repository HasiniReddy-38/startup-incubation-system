from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.auth_dependency import get_db

from app.models.startup import StartupProfile
from app.models.investor import InvestorProfile
from app.models.challenge import Challenge
from app.models.proposal import Proposal

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db)
):
    return {
        "startups": db.query(StartupProfile).count(),
        "investors": db.query(InvestorProfile).count(),
        "challenges": db.query(Challenge).count(),
        "proposals": db.query(Proposal).count()
    }