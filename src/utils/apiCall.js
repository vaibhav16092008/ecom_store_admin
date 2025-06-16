import axios from "axios";
import { apiConfig, token } from "./connection";

const apiInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: 10000,
  headers: {
    Authorization: token(),
  },
});
const apiInstanceWH = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: 10000,
});

export const postCallWH = async (url ="", data) => {  
  try {
    const response = await apiInstanceWH.post(url, data);
    return response;
  } catch (error) {
    return error;
  }
}

// Get APi call
export const getCall = async (url = "") => {
  try {
    const response = await apiInstance.get(url);
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
