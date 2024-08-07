from workers.model import ModelWorker
from workers.storage import StorageWorker
from utils.const import MINUTE


if __name__ == "__main__":
    sleep_interval = 15 * MINUTE
    ModelWorker(sleep_interval).start()
    StorageWorker(sleep_interval).start()
