import axios from "axios";
import queryString from "query-string";
import { getItem } from "../handlers/tokenHandler";

export const hostClient = "https://freshgreen.vercel.app";
// export const hostServer = "https://server.freshgreen.io.vn";
export const hostServer = "https://server-freshgreen-io.onrender.com";

// export const hostClient = "http://localhost:3000";
// export const hostServer = "http://localhost:5000";
// export const hostServer = "http://52.221.193.19";

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
    }
    throw err.response;
  }
);

export default axiosClient;
