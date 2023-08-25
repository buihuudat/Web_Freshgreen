import axiosClient from "./axiosClient";

const commentApi = {
  getProductComment: (productId: string) =>
    axiosClient.get(`/comments/${productId}`),

  addComment: ({
    productId,
    userId,
    comment,
  }: {
    productId: string;
    userId: string;
    comment: string;
  }) =>
    axiosClient.post(`/comments/product/${productId}/user/${userId}`, {
      comment,
    }),
};

export default commentApi;
