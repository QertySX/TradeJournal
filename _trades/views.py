from fastapi import FastAPI, APIRouter, Request
import logging
from fastapi.templating import Jinja2Templates


logging.basicConfig(level=logging.INFO)
trades_router = APIRouter()
templates = Jinja2Templates(directory="templates")


@trades_router.get("/trades")
async def get_index(request: Request):
    return templates.TemplateResponse("trades.html", {
        "request": request
        })

