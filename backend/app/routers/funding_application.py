# app/routers/funding_application.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.auth_dependency import get_db

from app.models.funding_application import FundingApplication
from app.schemas.funding_application import FundingApplicationCreate
from app.schemas.funding_application_update import FundingApplicationUpdate
from app.models.funding import FundingOpportunity
from app.models.startup import StartupProfile

router = APIRouter(
    prefix="/funding-application",
    tags=["Funding Applications"]
)


@router.post("/")
def apply_for_funding(
    application: FundingApplicationCreate,
    db: Session = Depends(get_db)
):

    new_application = FundingApplication(
        funding_id=application.funding_id,
        startup_id=application.startup_id,
        status="Pending"
    )

    db.add(new_application)
    db.commit()
    db.refresh(new_application)

    return {
        "message": "Application submitted",
        "id": new_application.id
    }





@router.get("/")
def get_applications(
    db: Session = Depends(get_db)
):
    applications = db.query(
        FundingApplication
    ).all()

    result = []

    for app in applications:

        funding = db.query(
            FundingOpportunity
        ).filter(
            FundingOpportunity.id == app.funding_id
        ).first()

        startup = db.query(
            StartupProfile
        ).filter(
            StartupProfile.id == app.startup_id
        ).first()

        result.append({
            "id": app.id,
            "funding_title": funding.title if funding else "Unknown",
            "startup_name": startup.company_name if startup else "Unknown",
            "status": app.status
        })

    return result

@router.put("/{application_id}")
def update_application_status(
    application_id: int,
    payload: FundingApplicationUpdate,
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

    application.status = payload.status

    db.commit()

    return {
        "message": f"Application {payload.status}"
    }