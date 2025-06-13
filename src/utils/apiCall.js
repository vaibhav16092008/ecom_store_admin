import axios from "axios";
import { apiConfig, token } from "./connection";

const apiInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: 10000,
  headers: {
    Authorization: token(),
  },
});

// Get APi call
export const getCall = async (url = "") => {
  try {
    const response = await apiInstance.get("");
    return response?.data;
  } catch (error) {
    return error;
  }
};
// Post APi call
export const postCall = async (url = "", data) => {
  try {
    const response = await apiInstance.post(url, data);

    return response;
  } catch (error) {
    return error;
  }
};
