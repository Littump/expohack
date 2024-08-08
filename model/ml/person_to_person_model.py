from datetime import datetime, timedelta
from typing import List, Optional

import numpy as np
import pandas as pd
from sklearn.decomposition import NMF


class CollaborativeFiltering:
    def __init__(self, df: pd.DataFrame, timestamp_col: str = 'TIMESTAMP', client_col: str = 'CLIENT_ID',
                 goods_col: str = 'GOODS_ID'):
        """
        Initialize the CollaborativeFiltering class.

        Args:
            df (pd.DataFrame): The input dataframe containing client-goods transactions.
            timestamp_col (str): The name of the timestamp column.
            client_col (str): The name of the client ID column.
            goods_col (str): The name of the goods ID column.
        """
        self.df = df
        self.timestamp_col = timestamp_col
        self.client_col = client_col
        self.goods_col = goods_col
        self.user_item_matrix: Optional[pd.DataFrame] = None
        self.model: Optional[NMF] = None

    def filter_data(self, months: int = 3):
        """
        Filter the data to include only transactions from the last `months` months.

        Args:
            months (int): The number of months to filter the data.
        """
        self.df[self.timestamp_col] = pd.to_datetime(self.df[self.timestamp_col], unit='s')
        three_months_ago = datetime.now() - timedelta(days=30 * months)
        self.df = self.df[self.df[self.timestamp_col] >= three_months_ago]

    def create_user_item_matrix(self):
        """
        Create a user-item matrix where rows represent clients and columns represent goods.
        """
        self.user_item_matrix = self.df.pivot_table(index=self.client_col, columns=self.goods_col, aggfunc='size',
                                                    fill_value=0)

    def train_model(self, n_components: int = 10):
        """
        Train the NMF model on the user-item matrix.

        Args:
            n_components (int): The number of components for the NMF model.
        """
        self.model = NMF(n_components=n_components)
        self.model.fit(self.user_item_matrix)

    def predict(self, client_id: int, top_n: int = 5) -> List[int]:
        """
        Predict the top N items for a given client.

        Args:
            client_id (int): The ID of the client.
            top_n (int): The number of top items to predict.

        Returns:
            List[int]: A list of the top N item IDs.
        """
        if client_id not in self.user_item_matrix.index:
            print(f"Client ID {client_id} not found in the data.")
            return []

        user_vector = self.user_item_matrix.loc[client_id].values.reshape(1, -1)
        predicted_scores = self.model.inverse_transform(self.model.transform(user_vector))
        top_items = np.argsort(predicted_scores[0])[::-1][:top_n]
        item_ids = self.user_item_matrix.columns[top_items]

        return item_ids.tolist()

    def run_pipeline(self):
        """
        Run pipeline for model training
        """
        self.filter_data()
        self.create_user_item_matrix()
        self.train_model()
