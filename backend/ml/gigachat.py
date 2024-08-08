import base64
import json
import uuid

import requests
from project import config


class GigachatAPI:
    def __init__(self):
        self.client_id = config.CLIENT_ID
        self.client_secret = config.CLIENT_SECRET
        self.token_url = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth'
        self.api_url = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions'
        self.access_token = self._get_token()

    def _get_token(self) -> str:
        request_id = str(uuid.uuid4())
        token_data = {'scope': 'GIGACHAT_API_PERS'}
        credentials = base64.b64encode(f'{self.client_id}:{self.client_secret}'.encode()).decode()
        token_headers = {
            'Authorization': f'Basic {credentials}',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'RqUID': request_id
        }
        response = requests.post(self.token_url, headers=token_headers, data=token_data, verify=False)
        response.raise_for_status()
        return response.json()['access_token']

    def _generate_answer(self, prompt: str, temperature=1, max_tokens=512) -> str:
        payload = json.dumps({
            'model': 'GigaChat',
            'messages': [
                {
                    'role': 'user',
                    'content': f'{prompt}'
                }
            ],
            'temperature': temperature,
            'top_p': 0.1,
            'n': 1,
            'stream': False,
            'max_tokens': max_tokens,
            'repetition_penalty': 1,
            'update_interval': 0
        })
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': f'Bearer {self.access_token}'
        }

        response = requests.post(self.api_url, headers=headers, data=payload, verify=False)
        response.raise_for_status()

        content = response.json()['choices'][0]['message']['content']
        return content
