from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.auth_dependency import get_db
from app.models.startup import StartupProfile
from app.models.investor import InvestorProfile

router = APIRouter(
    prefix="/matchmaking",
    tags=["AI Matchmaking"]
)


def parse_money(value):
    value = str(value).lower().strip()

    try:
        if "crore" in value:
            return float(
                value.replace("crore", "").strip()
            ) * 10000000

        if "lakh" in value:
            return float(
                value.replace("lakh", "").strip()
            ) * 100000

        return float(value)

    except:
        return 0


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
            if (
                startup.industry
                and investor.preferred_sector
                and startup.industry.lower()
                == investor.preferred_sector.lower()
            ):
                score += 50
                reasons.append("Industry Match")

            # Funding Match
            startup_funding = parse_money(
                startup.funding_required
            )

            investor_max = parse_money(
                investor.max_investment
            )

            if startup_funding <= investor_max:
                score += 30
                reasons.append("Funding Alignment")

            # Location Match
            if (
                startup.location
                and investor.location
                and startup.location.lower()
                == investor.location.lower()
            ):
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