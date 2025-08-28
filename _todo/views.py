from fastapi import FastAPI, APIRouter, Request
import logging
from fastapi.templating import Jinja2Templates


logging.basicConfig(level=logging.INFO)
todo_router = APIRouter()
templates = Jinja2Templates(directory="templates")


@todo_router.get("/to-do")
async def get_index(request: Request):
    return templates.TemplateResponse("todo.html", {
        "request": request
        })