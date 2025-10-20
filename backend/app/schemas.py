from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserBase(BaseModel):
    name: str
    email: str
    role: str


class UserCreate(UserBase):
    password: str


class UserSchema(UserBase):
    id: int
    is_active: bool

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    role: Optional[str] = None


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
    night_start_time: Optional[str] = None
    night_end_time: Optional[str] = None
