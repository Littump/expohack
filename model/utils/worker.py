import threading

import six


class WorkerMeta(type):
    workers = []

    def __call__(cls, *args, **kwargs):
        worker = super(WorkerMeta, cls).__call__(*args, **kwargs)
        cls.workers.append(worker)
        return worker


class Worker(six.with_metaclass(WorkerMeta, threading.Thread)):
    def __init__(self, sleep_interval: int):
        super(Worker, self).__init__()
        self.start_event = threading.Event()
        self.sleep_interval = sleep_interval

    def run(self):
        while True:
            try:
                self.run_once()
            except Exception as e:
                print(e)
            self.start_event.wait(self.sleep_interval)

    def run_once(self):
        raise NotImplementedError
