from database import Thing, get_session
from utils.singltone import Singletone
from utils.worker import Worker


class Storage(metaclass=Singletone):
    def __init__(self):
        self.items = {}


class StorageWorker(Worker):

    def __init__(self, sleep_interval):
        super().__init__(sleep_interval)
        self.storage = Storage()

    def run_once(self):
        with get_session() as session:
            things = session.query(Thing).all()
            for thing in things:
                self.storage.items[thing.id] = {
                    'name': thing.name,
                    'description': thing.description
                }
