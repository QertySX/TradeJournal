from fastapi import FastAPI, APIRouter, Request
import logging
from fastapi.templating import Jinja2Templates


logging.basicConfig(level=logging.INFO)
accounts_router = APIRouter()
templates = Jinja2Templates(directory="templates")



