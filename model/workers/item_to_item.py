from datetime import datetime

from database import Recommendation, Thing, get_session
from ml.item_to_item_model import PredictionModel
from storages import Storage
from utils.worker import Worker


class ItemToItemWorker(Worker):
    def __init__(self, sleep_interval):
        super().__init__(sleep_interval)
        self.storage = Storage()
        self.model = PredictionModel(list(self.storage.things))

    def get_recommendation(self, thing):
        return self.model.get_predictions_for_one_item(thing)

    def run_once(self):
        with get_session() as session:
            things = (
                session.query(Thing)
                .order_by(Thing.last_update)
                .limit(10)
                .all()
            )
            for thing in things:
                recommendation = self.get_recommendation(thing.__dict__)
                _ = (
                    session.query(Recommendation)
                    .filter(Recommendation.thing_id == thing.id)
                    .delete()
                )
                for item in recommendation:
                    _ = session.add(
                        Recommendation(
                            thing_id=thing.id,
                            thing_recommendation_id=item
                        )
                    )
                thing.last_update = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                session.commit()
