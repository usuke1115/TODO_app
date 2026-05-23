from datetime import datetime
from pydantic import BaseModel, Field
import typing as t

class TodoValidator(BaseModel):
    id: t.Optional[int] = None
    userId: t.Optional[int]
    name: str = Field(pattern=r"^\S+$")
    is_completed: t.Literal[True, False] = False
    created_at: t.Optional[datetime] = None
    updated_at: t.Optional[datetime] = None
