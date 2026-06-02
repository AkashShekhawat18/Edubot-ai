from pydantic import BaseModel, Field


class PaperRequest(BaseModel):
    topic: str = Field(..., min_length=1, description="The target topic for the paper")
    num_questions: int = Field(..., gt=0, description="Number of questions to generate")


class PaperResponse(BaseModel):
    paper: dict
