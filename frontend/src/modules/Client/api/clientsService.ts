import axios from "axios";
import { API_URL } from "@/config/api.ts";
import { IClient } from "../types/responses";

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
  async changeFavourite(id: string) {
    return axios.post(
      `${API_URL}clients/${id}/change_favorite/`,
      {},
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
  }
}

export default new clientsService();
