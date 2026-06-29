from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine, Base

from app.models.user import User
from app.models.startup import StartupProfile
from app.models.investor import InvestorProfile
from app.models.corporate import CorporateProfile
from app.models.jury import JuryProfile
from app.models.challenge import Challenge
from app.models.proposal import Proposal
from app.models.review import Review

from app.routers import auth
from app.routers import startup
from app.routers import investor
from app.routers import corporate
from app.routers import jury
from app.routers import challenge
from app.routers import proposal
from app.routers import review
from app.routers import ranking
from app.routers import matchmaking
from app.routers import dashboard
from app.routers.ai_insights import router as ai_insights_router
from app.models.funding import FundingOpportunity
from app.routers import funding
from app.routers import ai_assistant
from app.models.funding_application import FundingApplication
from app.routers import funding_application
from app.models.funding import FundingOpportunity
from app.routers import funding
from app.routers import funding_application

app = FastAPI(
    title="Innovation Ecosystem Platform API"
)

# -----------------------------
# CORS CONFIGURATION
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# CREATE TABLES
# -----------------------------
Base.metadata.create_all(bind=engine)

# -----------------------------
# ROUTERS
# -----------------------------
app.include_router(auth.router)
app.include_router(startup.router)
app.include_router(investor.router)
app.include_router(corporate.router)
app.include_router(jury.router)
app.include_router(challenge.router)
app.include_router(proposal.router)
app.include_router(review.router)
app.include_router(ranking.router)
app.include_router(matchmaking.router)

app.include_router(dashboard.router)
app.include_router(challenge.router)
app.include_router(ai_insights_router)
app.include_router(funding.router)
app.include_router(ai_assistant.router)
app.include_router(
    funding_application.router
)
app.include_router(funding_application.router)


# -----------------------------
# HEALTH CHECK
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "Innovation Ecosystem Platform API is running"
    }