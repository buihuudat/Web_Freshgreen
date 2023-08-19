import axiosClient from "./axiosClient";

const commentApi = {
  getProductComment: (productId: string) =>
    axiosClient.get(`/comments/${productId}`),
};

export default commentApi;
