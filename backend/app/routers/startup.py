from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.auth_dependency import get_db
from app.models.startup import StartupProfile
from app.schemas.startup_schema import StartupCreate

router = APIRouter(
    prefix="/startup",
    tags=["Startup"]
)

@router.post("/profile")
def create_profile(
    startup: StartupCreate,
    db: Session = Depends(get_db)
):

    new_startup = StartupProfile(
        user_id=startup.user_id,
        company_name=startup.company_name,
        industry=startup.industry,
        stage=startup.stage,
        funding_required=startup.funding_required,
        description=startup.description,
        location=startup.location,
        website=startup.website,
        pitch_deck_url=startup.pitch_deck_url
    )

    db.add(new_startup)
    db.commit()
    db.refresh(new_startup)

    return {
        "message": "Startup profile created successfully",
        "startup_id": new_startup.id
    }


@router.get("/profile/{id}")
def get_profile(
    id: int,
    db: Session = Depends(get_db)
):
    return db.query(StartupProfile).filter(
        StartupProfile.id == id
    ).first()


@router.get("/all")
def get_all_startups(
    db: Session = Depends(get_db)
):
    return db.query(StartupProfile).all()