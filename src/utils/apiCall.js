import axios from "axios";
import { apiConfig, token } from "./connection";

const apiInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: 10000,
  headers: {
    Authorization: token(),
    "Content-Type": "Application/json",
  },
});
const apiInstanceWH = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "Application/json",
  },
});

export const postCallWH = async (url = "", data) => {
  try {
    const response = await apiInstanceWH.post(url, data);
    return response;
  } catch (error) {
    return error;
  }
};

// Get APi call
export const getCall = async (url = "") => {
  try {
    const response = await apiInstance.get(url);
    return response;
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
// Update Api Call
export const putCall = async (url = "", data) => {
  try {
    const response = await apiInstance.put(url, data);

    return response;
  } catch (error) {
    return error;
  }
};
export const deleteCall = async (url = "") => {
  try {
    const response = await apiInstance.delete(url);

    return response;
  } catch (error) {
    return error;
  }
};
