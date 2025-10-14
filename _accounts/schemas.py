from pydantic import BaseModel, EmailStr, constr
from datetime import datetime


# ---------------------> Register
class RegisterSchema(BaseModel):
    username: str
    email: EmailStr
    password: str
    confirm_password: str


# ---------------------> Auth
class AuthSchema(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str


class UserS(BaseModel):
    username: str
    email: str | None = None
    disabled: bool | None = None

    class Config:
        from_attributes = True