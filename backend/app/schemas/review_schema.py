from pydantic import BaseModel

class ReviewCreate(BaseModel):
    proposal_id: int
    jury_id: int
    innovation_score: int
    feasibility_score: int
    impact_score: int