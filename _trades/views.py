from fastapi import APIRouter, Request, Depends
import logging
from fastapi.templating import Jinja2Templates

from _accounts.schemas import UserS
from services.auth.auth_logic import get_current_user_from_cookie

logging.basicConfig(level=logging.INFO)
trades_router = APIRouter()
templates = Jinja2Templates(directory="templates")


@trades_router.get("/trades")
async def index(request: Request,
    user: UserS = Depends(get_current_user_from_cookie)
    ):
    return templates.TemplateResponse("trades.html", {
        "request": request,
        'user': user
        })

