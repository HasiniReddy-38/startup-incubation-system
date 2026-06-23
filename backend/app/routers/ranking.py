from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.dependencies.auth_dependency import get_db
from app.models.review import Review
from app.models.proposal import Proposal
from app.models.startup import StartupProfile

router = APIRouter(
    prefix="/rankings",
    tags=["Rankings"]
)


@router.get("/startups")
def rank_startups(db: Session = Depends(get_db)):

    rankings = (
        db.query(
            StartupProfile.company_name,
            func.avg(Review.total_score).label("average_score")
        )
        .join(
            Proposal,
            Proposal.startup_id == StartupProfile.id
        )
        .join(
            Review,
            Review.proposal_id == Proposal.id
        )
        .group_by(StartupProfile.company_name)
        .order_by(func.avg(Review.total_score).desc())
        .all()
    )

    result = []

    for startup, avg_score in rankings:
        result.append(
            {
                "company_name": startup,
                "average_score": float(avg_score)
            }
        )

    return result