from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1, description="The tutor question text")


class ChatResponse(BaseModel):
    response: str
