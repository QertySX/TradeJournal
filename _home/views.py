from fastapi import FastAPI, APIRouter, Request
import logging
from fastapi.templating import Jinja2Templates


logging.basicConfig(level=logging.INFO)
home_router = APIRouter()
templates = Jinja2Templates(directory="templates")


@home_router.get("/index")
async def get_index(request: Request):
    return templates.TemplateResponse("index.html", {
        "request": request
        })

