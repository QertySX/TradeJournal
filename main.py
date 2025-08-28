from fastapi import FastAPI
import uvicorn
from urls import app
from fastapi.staticfiles import StaticFiles


app.mount("/static", StaticFiles(directory="static"), name="static")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000 , reload=True)