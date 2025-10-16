from fastapi import FastAPI, APIRouter, Request, Depends
import logging
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse

from services.auth.auth_logic import get_current_user_from_cookie
from _accounts.schemas import UserS


logging.basicConfig(level=logging.INFO)
home_router = APIRouter()
templates = Jinja2Templates(directory="templates")


@home_router.get('/')
async def index(request: Request):
    return templates.TemplateResponse('index.html', {
        'request': request
    })


@home_router.get("/overview")
async def get_overview(
    request: Request,
    user: UserS = Depends(get_current_user_from_cookie)
    ):

    return templates.TemplateResponse("overview.html", {
        "request": request,
        'user': user
        })

