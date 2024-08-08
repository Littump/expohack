from typing import Dict, List

from clients.gigachat import GigachatAPI
from ml.prompt_templates import prompt_item_to_item_filtration


class PredictionModel:
    """
    A class to handle prediction models using a language model API.

    Attributes:
        items (List[Dict[str, Any]]): A list of items to be used for prediction.
        prompt_template (str): The template for formulating prompts.
        llm_api (GigaChatAPI): The API instance for the language model.
    """

    def __init__(self, items: List[Dict[str, any]]):
        """
        Initializes the PredictionModel with a list of items.

        Args:
            items (List[Dict[str, Any]]): A list of items to be used for prediction.
        """
        self.prompt_template = prompt_item_to_item_filtration
        self.llm_api = GigachatAPI()
        self.items = items

    def _formulate_description(self, item: Dict[str, any]) -> str:
        """
        Formulates a description for a given item.

        Args:
            item (Dict[str, Any]): The item for which the description is to be formulated.

        Returns:
            str: The formulated description.
        """
        return f'{item["name"]}: {item["description"]}'

    def _formulate_prompt(self, item_base: str, item_sup: str) -> str:
        """
        Formulates a prompt using the base and supplementary items.

        Args:
            item_base (str): The base item description.
            item_sup (str): The supplementary item description.

        Returns:
            str: The formulated prompt.
        """
        return self.prompt_template.format(item_base, item_sup)

    def _response_to_label(self, response: str) -> int:
        """
        Converts the response from the language model to a label.

        Args:
            response (str): The response from the language model.

        Returns:
            int: The label (1 or 0).
        """
        return 1 if "1" in response else 0

    def _get_prediction_for_one_pair(self, item_base_str: str, item_sup_str: str) -> int:
        """
        Gets the prediction for a pair of items.

        Args:
            item_base_str (str): The base item description.
            item_sup_str (str): The supplementary item description.

        Returns:
            int: The prediction label (1 or 0).
        """
        prompt_formatted = self._formulate_prompt(item_base_str, item_sup_str)
        answer = self.llm_api._generate_answer(prompt_formatted)
        pred = self._response_to_label(answer)

        return pred

    def get_predictions_for_one_item(self, item_osn: Dict[str, any]) -> List[int]:
        """
        Gets predictions for a single item against all other items.

        Args:
            item_osn (Dict[str, Any]): The base item for which predictions are to be made.

        Returns:
            List[int]: A list of item IDs that match the base item.
        """
        result = []
        item_osn_description = self._formulate_description(item_osn)

        for item_sup in self.items:
            if item_osn["id"] != item_sup["id"]:
                item_sup_description = self._formulate_description(item_sup)
                prediction = self._get_prediction_for_one_pair(item_osn_description, item_sup_description)
                if prediction == 1:
                    result.append(item_sup["id"])

        return result
