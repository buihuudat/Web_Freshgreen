import { PaginationType } from "../../types/dataTypes";
import { ProductType } from "../../types/productType";
import axiosClient from "./axiosClient";

export const productApi = {
  gets: (pagination?: PaginationType) =>
    axiosClient.get(
      pagination
        ? `/products?page=${pagination.page}&perPage=${pagination.perPage}`
        : "/products"
    ),
  get: (product: ProductType) => axiosClient.get(`/products/${product._id}`),
  create: (newProduct: ProductType) =>
    axiosClient.post("/products/create", newProduct),
  update: (newProduct: ProductType) =>
    axiosClient.put(`/products/${newProduct._id}`, newProduct),
  delete: (product: ProductType) =>
    axiosClient.patch(`/products/${product._id}`),

  shopProducts: (id: string) =>
    axiosClient.get(`/products/shop/${id}/products`),
};
