import os

from dotenv import load_dotenv


load_dotenv()

KEY_YANDEX = os.getenv("KEY_YANDEX")
LOG_GROUP_ID = os.getenv("LOG_GROUP_ID")

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
