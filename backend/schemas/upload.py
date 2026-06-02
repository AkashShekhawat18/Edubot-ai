from pydantic import BaseModel


class UploadResponse(BaseModel):
    book: dict
    status: str
