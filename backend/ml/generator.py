import requests
import base64
import uuid
import json

class GigaChatAPI:
    def __init__(self):
        self.client_id = '0f02ee18-f159-45b6-a20e-963bf257bdcd'
        self.client_secret = '6c387850-f7a7-4619-818a-253a73e6d3c1'
        self.token_url = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth'
        self.api_url = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions'
        self.access_token = self._get_token()

    def _get_token(self) -> str:
        request_id = str(uuid.uuid4())
        token_data = {'scope': 'GIGACHAT_API_PERS'}
        credentials = base64.b64encode(f"{self.client_id}:{self.client_secret}".encode()).decode()
        token_headers = {
            'Authorization': f'Basic {credentials}',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'RqUID': request_id
        }
        response = requests.post(self.token_url, headers=token_headers, data=token_data, verify=False)
        response.raise_for_status()
        return response.json()['access_token']

    def _build_prompt(self, main_product: dict, additional_products: dict) -> str:
        main_product_name = list(main_product.keys())[0]
        main_product_desc = main_product[main_product_name]

        prompt = f"Основной товар для продажи: {main_product_name}. Описание: {main_product_desc}.\n"

        if additional_products:
            prompt += "Дополнительные товары для кросс-продажи:\n"
            for name, desc in additional_products.items():
                prompt += f"- {name}: {desc}\n"

        prompt += "\nСоставь скрипт для продавца, как он может представить основной товар и предложить дополнительные товары для кросс-продажи клиенту."

        return prompt

    def _generate_answer(self, prompt: str, temperature=1, max_tokens=512) -> str:
        payload = json.dumps({
            "model": "GigaChat",
            "messages": [
                {
                    "role": "user",
                    "content": f'{prompt}' 
                }
            ],
            "temperature": temperature,
            "top_p": 0.1,
            "n": 1,
            "stream": False,
            "max_tokens": max_tokens,
            "repetition_penalty": 1,
            "update_interval": 0
        })
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': f'Bearer {self.access_token}'
        }

        response = requests.post(self.api_url, headers=headers, data=payload, verify=False)
        response.raise_for_status()
        
        content = response.json()["choices"][0]["message"]["content"]
        return content
    
    def get_script(self, main_product: dict, additional_products: dict) -> str:
        '''
        - main_product: {'product_name': 'pdoduct_descr'}
        - additional_products = {
            'product_name': 'pdoduct_descr',
            'product1_name': 'pdoduct1_descr'
        }
        '''
        prompt = self._build_prompt(main_product, additional_products)
        script = self._generate_answer(prompt)
        return script


# # Пример использования:
# giga_chat_api = GigaChatAPI()
# main_product = {"Смартфон XYZ": "Высококачественный смартфон с отличной камерой и длительным временем работы."}
# additional_products = {
#     "Чехол для смартфона XYZ": "Надежный чехол, который защитит ваш смартфон от ударов и царапин.",
#     "Зарядное устройство для XYZ": "Быстрое зарядное устройство, которое позволит вам заряжать смартфон за считанные минуты."
# }
# script = giga_chat_api.get_script(main_product, additional_products)
# print(script)