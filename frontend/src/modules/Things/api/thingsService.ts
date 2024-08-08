import axios from "axios";
import { API_URL } from "@/config/api.ts";
import { IThing } from "../types/responses";

class thingsService {
  async getThings({ id, name }: { id?: string; name?: string }) {
    return axios.get<IThing[]>(
      `${API_URL}things/${id ? `?id=${id}` : ""}${name ? `?name=${name}` : ""}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
  }
}

export default new thingsService();
