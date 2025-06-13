import Cookies from "js-cookie";

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
};

export const tokenTitle = "DUMMY_TITLE";

export const token = () => Cookies.get(tokenTitle);
export const setToken = (token = "") => {
  Cookies.set(tokenTitle, token);
};
export const removeToken = () => {
  Cookies.remove(tokenTitle);
};
