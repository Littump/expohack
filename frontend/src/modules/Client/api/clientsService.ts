import axios from "axios";
import { API_URL } from "@/config/api.ts";
import { IClient } from "../types/responses";
import { IThing } from "@/modules/Things/types/responses";

class clientsService {
  async getClients(filter: string, showOnlyFavourites: boolean) {
    return axios.get<IClient[]>(
      `${API_URL}clients/${
        showOnlyFavourites ? "favorites/" : ""
      }?id=${filter}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  async getHistory(id: string) {
    return axios.get<IThing[]>(`${API_URL}clients/?id=${id}/history/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
  }

  async getRecommendations(id: string) {
    return axios.get<IThing[]>(`${API_URL}clients/${id}/recommendations/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
  }
}

export default new clientsService();
