from utils.worker import Worker
from database import Thing, get_session
from workers.storage import Storage


class ModelWorker(Worker):
    def __init__(self, sleep_interval):
        super().__init__(sleep_interval)
        self.storage = Storage()

    def get_recommendation(self, thing):
        ...

    def run_once(self):
        with get_session() as session:
            things = (
                session.query(Thing)
                .filter(Thing.recommendation is None)
                .limit(10)
                .all()
            )
            for thing in things:
                recommendation = self.get_recommendation(thing)
                thing.recommendation = recommendation
                session.commit()
