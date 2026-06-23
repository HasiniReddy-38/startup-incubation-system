from pydantic import BaseModel

class ChallengeCreate(BaseModel):
    corporate_id:int
    title:str
    description:str
    domain:str
    reward:str