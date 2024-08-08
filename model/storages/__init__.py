from utils.singltone import Singletone


class Storage(metaclass=Singletone):
    def __init__(self):
        self.things = []
        self.things_ids = set()

        self.history = []
        self.history_ids = set()
