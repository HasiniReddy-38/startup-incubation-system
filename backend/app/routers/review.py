from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.auth_dependency import get_db
from app.models.review import Review
from app.schemas.review_schema import ReviewCreate

router = APIRouter(
    prefix="/review",
    tags=["Review"]
)


@router.post("/")
def create_review(
    review: ReviewCreate,
    db: Session = Depends(get_db)
):

    total_score = (
        review.innovation_score
        + review.feasibility_score
        + review.impact_score
    )

    new_review = Review(
        proposal_id=review.proposal_id,
        jury_id=review.jury_id,
        innovation_score=review.innovation_score,
        feasibility_score=review.feasibility_score,
        impact_score=review.impact_score,
        total_score=total_score
    )

    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    return {
        "message": "Review submitted successfully",
        "review_id": new_review.id,
        "total_score": total_score
    }


@router.get("/")
def get_reviews(db: Session = Depends(get_db)):
    return db.query(Review).all()