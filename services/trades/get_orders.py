import MetaTrader5 as mt5
import os 
from datetime import datetime, date
from dotenv import load_dotenv


load_dotenv()

login = int(os.getenv('login'))
password = os.getenv('password')
server = os.getenv('server')


def mt5_connection(func):
    def wrapper(*args, **kwargs):
        if not mt5.initialize(login=login, server=server, password=password):
            print("initialize() failed, error code =", mt5.last_error())
            return None
        try:
            result = func(*args, **kwargs)
        finally:
            mt5.shutdown()
        return result
    return wrapper


class TradeFetcher:
    @mt5_connection
    def get_trades(self):
        from_date = datetime(2025,9,1)
        to_date = datetime.now()
        
        all_deals = mt5.history_deals_get(from_date, to_date)

        if all_deals:
            open_deal = [o_deal for o_deal in all_deals if o_deal.entry == mt5.DEAL_ENTRY_IN]
            close_deal = [c_deal for c_deal in all_deals if c_deal.entry == mt5.DEAL_ENTRY_OUT]

        return open_deal, close_deal
        
    @mt5_connection
    def get_loss_profit_trades(self):
        from_date = datetime(2025,9,1)
        to_date = datetime.now()

        all_orders = mt5.history_orders_get(from_date, to_date)
        
        return all_orders


class AddTradesInDB:
    pass
