import Cookies from "js-cookie";

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_ADMIN_API_URL,
};

export const tokenTitle = "WEB_TOKEN_ECOM";

export const token = () => Cookies.get(tokenTitle);
export const setToken = (token = "") => {
  Cookies.set(tokenTitle, token);
};
export const removeToken = () => {
  Cookies.remove(tokenTitle);
};
