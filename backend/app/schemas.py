from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserBase(BaseModel):
    name: str
    email: str


class UserCreate(UserBase):
    password: str


class UserSchema(UserBase):
    id: int
    is_active: bool

    model_config = {"from_attributes": True}


class TurnCreate(BaseModel):
    date: datetime
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    shift: str = "descanso"
    days: int = 0
    morning_start_time: Optional[str] = None
    morning_end_time: Optional[str] = None
    afternoon_start_time: Optional[str] = None
    afternoon_end_time: Optional[str] = None
