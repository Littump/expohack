from ml.gigachat import GigachatAPI


class GenerateScript:
    def __init__(self):
        self.llm = GigachatAPI()
        self._generate_answer = self.llm._generate_answer
        self.access_token = self.llm._get_token()

    def _build_prompt(self, main_product: dict, additional_products: dict) -> str:
        main_product_name = list(main_product.keys())[0]
        main_product_desc = main_product[main_product_name]

        prompt = f'Основной товар для продажи: {main_product_name}. Описание: {main_product_desc}.\n'

        if additional_products:
            prompt += 'Дополнительные товары для кросс-продажи:\n'
            if additional_products:
                additional_items = "\n".join([f"- {name}: {desc}" for name, desc in additional_products.items()])
                prompt += f'Дополнительные товары для кросс-продажи:\n{additional_items}\n'

        prompt += ('\nСоставь скрипт для продавца, как он может представить основной товар '
                   'и предложить дополнительные товары для кросс-продажи клиенту.')

        return prompt

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
