from database import Thing, get_session
from utils.worker import Worker
from storages import Storage


class StorageThingWorker(Worker):

    def __init__(self, sleep_interval):
        super().__init__(sleep_interval)
        self.storage = Storage()

    def run_once(self):
        with get_session() as session:
            things = session.query(Thing).all()
            for thing in things:
                if thing.id not in self.storage.things_ids:
                    self.storage.things_ids.add(thing.id)
                    self.storage.things.append({
                        'id': thing.id,
                        'name': thing.name,
                        'description': thing.description
                    })
