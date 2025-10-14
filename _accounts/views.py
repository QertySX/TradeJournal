from fastapi import APIRouter, Request, Depends, Query, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse, JSONResponse
from sqlalchemy import select

from database.db import async_session
from _accounts.models import User
from _accounts.form import GetForm
from _accounts.schemas import RegisterSchema, AuthSchema
from services.auth.auth_logic import authenticate_user, create_access_token
from services.auth.hash_password import pwd_context

import os
from dotenv import load_dotenv

load_dotenv()

ACCESS_TOKEN_EXPIRE = int(os.getenv('ACCESS_TOKEN_EXPIRE'))

accounts_router = APIRouter()
templates = Jinja2Templates(directory="templates")


# ----------------------> Регистрация
@accounts_router.get("/register")
async def register_page(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})


@accounts_router.post("/register")
async def register_user(
    request: Request,
    user_data: RegisterSchema = Depends(GetForm.register_form),
):
    try:
        hashed_password = pwd_context.hash(user_data.password)
        async with async_session() as session:
            new_user = User(
                login=user_data.username,
                password_hash=hashed_password,
                email=user_data.email,
            )
            session.add(new_user)
            await session.commit()
    except Exception as e:
        return {"error": str(e)}

    return RedirectResponse(url="/login", status_code=302)


@accounts_router.get("/ajax_reg")
async def ajax_check_username(username: str = Query(...)):
    ''' AJAX ПРОВЕРКА: ЗАНЯТ ЛИ USERNAME '''
    async with async_session() as session:
        result = await session.execute(select(User).where(User.login == username))
        user = result.scalars().first()

    if user:
        return JSONResponse({"message": "Логін зайнятий!"})
    else:
        return JSONResponse({"message": "Логін вільний!"})


# --------------------------> Авторизація
@accounts_router.get('/login')
async def login_page(request: Request):
    return templates.TemplateResponse('login.html', {
        'request': request
    })


@accounts_router.post("/login")
async def login_user(request: Request, user_data: AuthSchema = Depends(GetForm.auth_form)):
    user = await authenticate_user(user_data.username, user_data.password)
    if not user:
        async with async_session() as session:
            result = await session.execute(select(User).where(User.login == user_data.username))
            if not result.scalars().first():
                message = "Логін не знайдено"
            else:
                message = "Не вірний пароль"
        return JSONResponse({"status": "error", "message": message})
    
    token = create_access_token(data={"sub": user_data.username})
    response = JSONResponse({"status": "success", "message": ""})
    response.set_cookie(
        key="access_token",
        value=f"Bearer {token}",
        httponly=True,
        max_age=int(ACCESS_TOKEN_EXPIRE)*60
    )
    return response


@accounts_router.get('/logout')
async def logout(request: Request):
    response = RedirectResponse(url="/login")
    response.delete_cookie(key="access_token")
    return response