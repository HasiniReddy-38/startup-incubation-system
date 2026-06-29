from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.auth_dependency import get_db

from app.models.startup import StartupProfile
from app.models.investor import InvestorProfile
from app.models.challenge import Challenge
from app.models.proposal import Proposal
from app.models.funding import FundingOpportunity

router = APIRouter(
    prefix="/assistant",
    tags=["AI Assistant"]
)

@router.post("/")
def ask_ai(
    payload: dict,
    db: Session = Depends(get_db)
):
    question = payload.get("question", "").lower()

    if "startup" in question:
        count = db.query(StartupProfile).count()

        return {
            "answer": f"There are {count} startups registered."
        }

    elif "investor" in question:
        count = db.query(InvestorProfile).count()

        return {
            "answer": f"There are {count} investors in the ecosystem."
        }

    elif "challenge" in question:
        count = db.query(Challenge).count()

        return {
            "answer": f"There are {count} active challenges."
        }

    elif "proposal" in question:
        count = db.query(Proposal).count()

        return {
            "answer": f"There are {count} submitted proposals."
        }

    elif "funding" in question:
        count = db.query(FundingOpportunity).count()

        return {
            "answer": f"There are {count} funding opportunities available."
        }

    else:
        return {
            "answer":
            "I can answer questions about startups, investors, challenges, proposals and funding."
        }