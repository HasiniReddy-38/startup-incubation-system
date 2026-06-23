from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.auth_dependency import get_db
from app.models.investor import InvestorProfile
from app.schemas.investor_schema import InvestorCreate

router = APIRouter(
    prefix="/investor",
    tags=["Investor"]
)

@router.post("/profile")
def create_profile(
    investor: InvestorCreate,
    db: Session = Depends(get_db)
):

    new_investor = InvestorProfile(
        user_id=investor.user_id,
        firm_name=investor.firm_name,
        preferred_sector=investor.preferred_sector,
        min_investment=investor.min_investment,
        max_investment=investor.max_investment,
        location=investor.location
    )

    db.add(new_investor)
    db.commit()
    db.refresh(new_investor)

    return {
        "message": "Investor profile created successfully",
        "investor_id": new_investor.id
    }


@router.get("/profile/{id}")
def get_profile(
    id: int,
    db: Session = Depends(get_db)
):
    return db.query(InvestorProfile).filter(
        InvestorProfile.id == id
    ).first()


@router.get("/all")
def get_all_investors(
    db: Session = Depends(get_db)
):
    return db.query(InvestorProfile).all()