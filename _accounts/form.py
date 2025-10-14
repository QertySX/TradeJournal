from fastapi import Form

from _accounts.schemas import RegisterSchema, AuthSchema


class GetForm:
    @staticmethod
    def register_form(
        username: str = Form(...), 
        email: str = Form(...), 
        password: str = Form(...), 
        confirm_password: str = Form(...)
    ) -> RegisterSchema:
        return RegisterSchema(
            username=username, 
            email=email, 
            password=password, 
            confirm_password=confirm_password
        )

    @staticmethod 
    def auth_form(
        username: str = Form(...),
        password: str = Form(...),
    ) -> AuthSchema: 
        return AuthSchema(
            username=username,
            password=password
        )