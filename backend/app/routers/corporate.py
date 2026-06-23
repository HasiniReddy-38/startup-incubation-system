from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.auth_dependency import get_db
from app.models.corporate import CorporateProfile
from app.schemas.corporate_schema import CorporateCreate

router = APIRouter(
    prefix="/corporate",
    tags=["Corporate"]
)

@router.post("/profile")
def create_profile(
    corporate: CorporateCreate,
    db: Session = Depends(get_db)
):

    new_corporate = CorporateProfile(
        user_id=corporate.user_id,
        organization_name=corporate.organization_name,
        industry=corporate.industry,
        problem_domain=corporate.problem_domain,
        location=corporate.location
    )

    db.add(new_corporate)
    db.commit()
    db.refresh(new_corporate)

    return {
        "message": "Corporate profile created successfully",
        "corporate_id": new_corporate.id
    }


@router.get("/all")
def get_all_corporates(
    db: Session = Depends(get_db)
):
    return db.query(CorporateProfile).all()