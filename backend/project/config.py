import os

from dotenv import load_dotenv


load_dotenv()

KEY_YANDEX = os.getenv("KEY_YANDEX")
LOG_GROUP_ID = os.getenv("LOG_GROUP_ID")

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")