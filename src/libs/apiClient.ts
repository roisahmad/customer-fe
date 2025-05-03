import { API_ROOT } from "@/configs/envUrl";
import axios, { AxiosInstance } from "axios";

const BASE_URL: string = API_ROOT

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;