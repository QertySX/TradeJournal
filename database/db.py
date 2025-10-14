from database.base import Base
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
import asyncio
import os 
from dotenv import load_dotenv


load_dotenv()

host = os.getenv('DB_HOST')
port = os.getenv('DB_PORT')
db_name = os.getenv('DB_NAME')
db_user = os.getenv('DB_USER')
password = os.getenv('DB_PASSWORD')


DATABASE_URL = f"postgresql+asyncpg://{db_user}:{password}@{host}:{port}/{db_name}"

engine = create_async_engine(DATABASE_URL, echo=True)

async_session = async_sessionmaker(engine, expire_on_commit=False)

async def main():

    from _accounts.models import User
    from _trades.models import Trades

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)