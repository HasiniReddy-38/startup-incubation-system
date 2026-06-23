from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.auth_dependency import get_db
from app.models.startup import StartupProfile
from app.models.investor import InvestorProfile

router = APIRouter(
    prefix="/matchmaking",
    tags=["AI Matchmaking"]
)


@router.get("/")
def match_startups_and_investors(
    db: Session = Depends(get_db)
):

    startups = db.query(StartupProfile).all()
    investors = db.query(InvestorProfile).all()

    matches = []

    for startup in startups:
        for investor in investors:

            score = 0
            reasons = []

            # Industry Match
            if startup.industry.lower() == investor.preferred_sector.lower():
                score += 50
                reasons.append("Industry Match")

            # Funding Match
            if (
                int(startup.funding_required)
                <= int(investor.max_investment)
            ):
                score += 30
                reasons.append("Funding Alignment")

            # Location Match
            if startup.location.lower() == investor.location.lower():
                score += 20
                reasons.append("Location Match")

            matches.append({
                "startup": startup.company_name,
                "investor": investor.firm_name,
                "match_score": score,
                "reason": (
                    ", ".join(reasons)
                    if reasons
                    else "Low Compatibility"
                )
            })

    matches.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return matches