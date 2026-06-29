from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from collections import Counter

from app.dependencies.auth_dependency import get_db

from app.models.startup import StartupProfile
from app.models.investor import InvestorProfile
from app.models.challenge import Challenge

router = APIRouter(
    prefix="/ai-insights",
    tags=["AI Insights"]
)


@router.get("/")
def get_ai_insights(
    db: Session = Depends(get_db)
):
    startups = db.query(StartupProfile).all()
    investors = db.query(InvestorProfile).all()
    challenges = db.query(Challenge).all()

    startup_industries = [
        s.industry for s in startups if s.industry
    ]

    investor_sectors = [
        i.preferred_sector
        for i in investors
        if i.preferred_sector
    ]

    challenge_domains = [
        c.domain for c in challenges if c.domain
    ]

    top_funding_sector = (
        Counter(startup_industries).most_common(1)[0][0]
        if startup_industries
        else "N/A"
    )

    highest_investor_interest = (
        Counter(investor_sectors).most_common(1)[0][0]
        if investor_sectors
        else "N/A"
    )

    fastest_growing_domain = (
        Counter(challenge_domains).most_common(1)[0][0]
        if challenge_domains
        else "N/A"
    )

    recommended_challenge = fastest_growing_domain

    ecosystem_score = min(
        100,
        (
            len(startups) * 10
            + len(investors) * 10
            + len(challenges) * 15
        )
    )

    return {
        "top_funding_sector": top_funding_sector,
        "highest_investor_interest": highest_investor_interest,
        "fastest_growing_domain": fastest_growing_domain,
        "recommended_challenge": recommended_challenge,
        "ecosystem_score": ecosystem_score,
    }