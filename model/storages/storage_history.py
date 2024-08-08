from database import HistoryBuy, get_session
from utils.worker import Worker
from storages import Storage
from datetime import datetime


class StorageHistoryWorker(Worker):

    def __init__(self, sleep_interval):
        super().__init__(sleep_interval)
        self.storage = Storage()

    def run_once(self):
        with get_session() as session:
            history = session.query(HistoryBuy).all()
            for h in history:
                if h.id not in self.storage.history_ids:
                    self.storage.history_ids.add(h.id)
                    self.storage.history.append({
                        'CLIENT_ID': h.client_id,
                        'GOODS_ID': h.thing_id,
                        'TIMESTAMP': int(h.date.timestamp())
                    })
