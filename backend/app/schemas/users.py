from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, field_validator
import typing as t

class Name(BaseModel):
    first: str = Field(pattern=r"^[ぁ-んァ-ヶ一-龯々ー]+$")
    last: str = Field(pattern=r"^[ぁ-んァ-ヶ一-龯々ー]+$")

class Hurigana(BaseModel):
    first: str = Field(pattern=r"^[ァ-ヶ一]+$")
    last: str = Field(pattern=r"^[ァ-ヶ一]+$")

class Birthday(BaseModel):
    year: str
    month: str

    @field_validator("year")
    @classmethod
    def validate_year(cls, v):
        if not v.isdigit():
            raise ValueError("数字を入力してください")
 
        num = int(v)
        if not (1919 < num < 2026):
            raise ValueError("1920 ~ 2025を入力してください")
        return v
 
    @field_validator("month")
    @classmethod
    def validate_month(cls, v):
        if not v.isdigit():
            raise ValueError("数字を入力してください")
 
        num = int(v)
        if not (0 < num < 13):
            raise ValueError("1 ~ 12を入力してください")
        return v

class UserValidator(BaseModel):
    id: t.Optional[str] = None
    name: Name
    hurigana: Hurigana
    email: EmailStr
    sex: t.Literal["male", "female", "no_answer"]
    birthday: Birthday
    password: str = Field(min_length=8, max_length=64)
    created_at: t.Optional[datetime] = None
