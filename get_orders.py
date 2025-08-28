import MetaTrader5 as mt5
import os 
from datetime import datetime


login = int(os.getenv('MT5_LOGIN')) 
password = os.getenv('MT5_PASSWORD')
server = os.getenv('MT5_SERVER')


# establish MetaTrader 5 connection to a specified trading account
if not mt5.initialize(login=login, server=server,password=password):
    print("initialize() failed, error code =",mt5.last_error())
    quit()
 
from_date=datetime(2025,5,20)
to_date=datetime(2025,8,19)

all_deals = mt5.history_deals_get(from_date, to_date)
unique_deals = []

if all_deals:
    for deal in all_deals:
        # Фильтруем по типу входа - нам нужны только сделки, открывающие позицию
        if deal.entry == mt5.DEAL_ENTRY_IN:
            unique_deals.append(deal)

print(f"Количество сделок после фильтрации: {len(unique_deals)}")

for deal in unique_deals:
    print(deal)






# shut down connection to the MetaTrader 5 terminal
mt5.shutdown()