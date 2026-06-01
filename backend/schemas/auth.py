from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    username: str = Field(..., min_length=1, description="User login identifier")
    password: str = Field(..., min_length=1, description="User password")


class LoginResponse(BaseModel):
    user: dict
    token: str
