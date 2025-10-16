from fastapi import FastAPI, APIRouter, Request, Depends
import logging
from fastapi.templating import Jinja2Templates

from services.auth.auth_logic import get_current_user_from_cookie
from _accounts.schemas import UserS


logging.basicConfig(level=logging.INFO)
todo_router = APIRouter()
templates = Jinja2Templates(directory="templates")


@todo_router.get("/to-do")
async def get_index(request: Request,
    user: UserS = Depends(get_current_user_from_cookie)):
    return templates.TemplateResponse("todo.html", {
        "request": request,
        'user': user
        })