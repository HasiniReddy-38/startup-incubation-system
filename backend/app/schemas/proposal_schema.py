from pydantic import BaseModel

class ProposalCreate(BaseModel):
    challenge_id:int
    startup_id:int
    solution_description:str
    github_link:str
    pitch_deck_url:str