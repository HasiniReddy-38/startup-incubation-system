from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.auth_dependency import get_db
from app.models.funding import FundingOpportunity
from app.schemas.funding import FundingCreate
from app.models.funding_application import FundingApplication

router = APIRouter(
    prefix="/funding",
    tags=["Funding"]
)


@router.post("/")
def create_funding(
    funding: FundingCreate,
    db: Session = Depends(get_db)
):
    new_funding = FundingOpportunity(
        investor_id=funding.investor_id,
        title=funding.title,
        sector=funding.sector,
        amount=funding.amount,
        stage=funding.stage
    )

    db.add(new_funding)
    db.commit()
    db.refresh(new_funding)

    return {
        "message": "Funding opportunity created",
        "id": new_funding.id
    }


@router.get("/")
def get_funding(
    db: Session = Depends(get_db)
):
    return db.query(
        FundingOpportunity
    ).all()
@router.put("/{application_id}")
def update_application_status(
    application_id: int,
    payload: dict,
    db: Session = Depends(get_db)
):
    application = db.query(
        FundingApplication
    ).filter(
        FundingApplication.id == application_id
    ).first()

    if not application:
        return {
            "message": "Application not found"
        }

    application.status = payload["status"]

    db.commit()

    return {
        "message": "Status updated"
    }