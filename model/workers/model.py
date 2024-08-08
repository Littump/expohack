from database import Thing, get_session
from utils.worker import Worker
from workers.storage import Storage
from ../ml.item_to_item_model import PredictionModel


class ModelWorker(Worker):
    def __init__(self, sleep_interval):
        super().__init__(sleep_interval)
        self.storage = Storage()
        self.model = PredictionModel(self.storage)

    def get_recommendation(self, thing):
        return self.model.get_predictions_for_one_item(thing)

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
