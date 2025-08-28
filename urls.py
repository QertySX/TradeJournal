from fastapi import FastAPI
from _home.views import home_router
from _todo.views import todo_router
from _trades.views import trades_router


app = FastAPI()

app.include_router(home_router)
app.include_router(todo_router)
app.include_router(trades_router)