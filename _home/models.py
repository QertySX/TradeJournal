from sqlalchemy import Integer, String, Float, DateTime, Date, func, ForeignKey
from sqlalchemy.orm import declarative_base, relationship, Mapped, mapped_column
from datetime import datetime, date
from database.base import Base

class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    login: Mapped[str] = mapped_column(String(20), nullable=False)
    password_hash: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now(), nullable=False)


    trades: Mapped[list['Trades']] = relationship('Trades', back_populates='user')

    def __repr__(self):
        return f"User(login={self.login!r}, created_at={self.created_at!r})"