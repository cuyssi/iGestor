from pydantic import BaseModel, EmailStr

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

    model_config = {
        "from_attributes": True
    }
