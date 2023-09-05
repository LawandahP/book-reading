from pydantic import BaseModel
from typing import Optional


class Book(BaseModel):
    title: str
    

class BookUpdate(BaseModel):
    status: Optional[str]