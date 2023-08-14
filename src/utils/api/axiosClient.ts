import axios from "axios";
import queryString from "query-string";
import { getItem } from "../handlers/tokenHandler";

// const baseURL = "http://localhost:5000/api/v1";
export const hostClient = "https://web-ecommerce-bhd.vercel.app";
export const hostServer = "https://ecommerce-bhd.onrender.com";
const baseURL = `${hostServer}/api/v1`;

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params: any): string => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(
  async (config: any) => {
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaber ${getItem("user")}`,
      },
    };
  },
  (e) => {
    return Promise.reject(e);
  }
);
axiosClient.interceptors.response.use(
  (response: any) => {
    // if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axiosClient;
