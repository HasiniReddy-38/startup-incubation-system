from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.auth_dependency import get_db
from app.models.challenge import Challenge
from app.schemas.challenge_schema import ChallengeCreate

router = APIRouter(
    prefix="/challenge",
    tags=["Challenge"]
)

@router.post("/")
def create_challenge(challenge:ChallengeCreate,
                     db:Session=Depends(get_db)):

    new_challenge=Challenge(
        corporate_id=challenge.corporate_id,
        title=challenge.title,
        description=challenge.description,
        domain=challenge.domain,
        reward=challenge.reward
    )

    db.add(new_challenge)
    db.commit()
    db.refresh(new_challenge)

    return {
        "message":"Challenge created",
        "challenge_id":new_challenge.id
    }


@router.get("/")
def get_challenges(db:Session=Depends(get_db)):
    return db.query(Challenge).all()