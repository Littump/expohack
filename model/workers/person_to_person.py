import pandas
from database import Client, ClientRecommendation, get_session
from utils.worker import Worker
from storages import Storage
from ml.person_to_person_model import CollaborativeFiltering
from datetime import datetime


class PersonToPersonWorker(Worker):
    def __init__(self, sleep_interval):
        super().__init__(sleep_interval)
        self.storage = Storage()
        self.model = CollaborativeFiltering(pandas.DataFrame(list(self.storage.history)))

    def run_once(self):
        self.model.df = pandas.DataFrame(list(self.storage.history))
        self.model.run_pipeline()
        with get_session() as session:
            clients = (
                session.query(Client)
                .order_by(Client.last_update)
                .limit(10)
                .all()
            )
            for client in clients:
                things = self.model.predict(client.id)
                _ = (
                    session.query(ClientRecommendation)
                    .filter(ClientRecommendation.client_id == client.id)
                    .delete()
                )
                for thing in things:
                    _ = session.add(
                        ClientRecommendation(
                            client_id=client.id,
                            thing_id=thing
                        )
                    )
                client.last_update = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                session.commit()
