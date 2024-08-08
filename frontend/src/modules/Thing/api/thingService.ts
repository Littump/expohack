import axios from "axios";
import { API_URL } from "@/config/api.ts";
import { IThing } from "../types/responses";

class thingService {
  async getThing(id: string) {
    return axios.get<IThing>(`${API_URL}things/${id}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
  }

  async getRecommendation(id: string) {
    return axios.get<IThing[]>(`${API_URL}things/${id}/recommend/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
  }

  async getScript(id: string) {
    return axios.get<{ text: string }>(`${API_URL}things/${id}/script/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
  }
}

export default new thingService();
