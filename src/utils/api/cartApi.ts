import { ProductCartType } from "../../types/cartType";
import axiosClient from "./axiosClient";

export const cartApi = {
  getCart: (userId: string) => axiosClient.get(`/cart/${userId}`),
  addProductToCart: (userId: string, product: ProductCartType) =>
    axiosClient.post(`/cart/${userId}/add`, { product }),
  upCountProduct: (cartId: string, productId: string) =>
    axiosClient.put(`/cart/${cartId}/add/${productId}`),
  downCountProduct: (cartId: string, productId: string) =>
    axiosClient.put(`/cart/${cartId}/remove/${productId}`),
  removeProduct: (cartId: string, productId: string) =>
    axiosClient.put(`/cart/${cartId}/product/${productId}`),
};
