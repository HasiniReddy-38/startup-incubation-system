from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.auth_dependency import get_db
from app.models.proposal import Proposal
from app.schemas.proposal_schema import ProposalCreate

router = APIRouter(
    prefix="/proposal",
    tags=["Proposal"]
)


@router.post("/")
def create_proposal(
    proposal: ProposalCreate,
    db: Session = Depends(get_db)
):

    new_proposal = Proposal(
        challenge_id=proposal.challenge_id,
        startup_id=proposal.startup_id,
        solution_description=proposal.solution_description,
        github_link=proposal.github_link,
        pitch_deck_url=proposal.pitch_deck_url
    )

    db.add(new_proposal)
    db.commit()
    db.refresh(new_proposal)

    return {
        "message": "Proposal submitted successfully",
        "proposal_id": new_proposal.id
    }


@router.get("/")
def get_proposals(
        db: Session = Depends(get_db)):
    return db.query(Proposal).all()