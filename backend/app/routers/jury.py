from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.auth_dependency import get_db
from app.models.jury import JuryProfile
from app.schemas.jury_schema import JuryCreate

router = APIRouter(
    prefix="/jury",
    tags=["Jury"]
)

@router.post("/profile")
def create_profile(
    jury: JuryCreate,
    db: Session = Depends(get_db)
):

    new_jury = JuryProfile(
        user_id=jury.user_id,
        name=jury.name,
        organization=jury.organization,
        expertise=jury.expertise,
        experience_years=jury.experience_years
    )

    db.add(new_jury)
    db.commit()
    db.refresh(new_jury)

    return {
        "message": "Jury profile created successfully",
        "jury_id": new_jury.id
    }


@router.get("/all")
def get_all_jury(
    db: Session = Depends(get_db)
):
    return db.query(JuryProfile).all()