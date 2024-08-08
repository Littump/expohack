from utils.const import MINUTE
import time
from workers.item_to_item import ItemToItemWorker
from workers.person_to_person import PersonToPersonWorker
from storages.storage_things import StorageThingWorker
from storages.storage_history import StorageHistoryWorker


if __name__ == "__main__":
    StorageThingWorker(60 * MINUTE).start()
    StorageHistoryWorker(60 * MINUTE).start()
    time.sleep(10)
    ItemToItemWorker(15 * MINUTE).start()
    PersonToPersonWorker(15 * MINUTE).start()
