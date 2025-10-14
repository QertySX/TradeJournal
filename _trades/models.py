from datetime import datetime
from sqlalchemy import Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column
from database.base import Base




class Trades(Base):
    __tablename__ = 'trades'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    symbol: Mapped[str] = mapped_column(String(20), nullable=False)
    position_id: Mapped[int] = mapped_column(Integer, unique=True)
    date: Mapped[datetime] = mapped_column(DateTime)
    type: Mapped[str] = mapped_column(String(30), nullable=False)
    volume: Mapped[float] = mapped_column(Float, nullable=False)
    price_open: Mapped[float] = mapped_column(Float, nullable=False)
    price_close: Mapped[float] = mapped_column(Float, nullable=False)
    commission: Mapped[float] = mapped_column(Float, nullable=False)
    profit: Mapped[float] = mapped_column(Float, nullable=False)

    user: Mapped['User'] = relationship('User', back_populates='trades')

    def __repr__(self):
        return (f"RawTrades(position_id={self.position_id!r}, symbol={self.symbol!r}, "
                f"date={self.date!r}, profit={self.profit!r})")
