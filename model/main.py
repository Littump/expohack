import time

from storages.storage_history import StorageHistoryWorker
from storages.storage_things import StorageThingWorker
from utils.const import MINUTE
from workers.item_to_item import ItemToItemWorker
from workers.person_to_person import PersonToPersonWorker


if __name__ == "__main__":
    StorageThingWorker(60 * MINUTE).start()
    StorageHistoryWorker(60 * MINUTE).start()
    time.sleep(10)
    ItemToItemWorker(15 * MINUTE).start()
    PersonToPersonWorker(15 * MINUTE).start()
