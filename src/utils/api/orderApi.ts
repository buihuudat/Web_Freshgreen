import { OrderItemType, PayStatus } from "../../types/orderType";
import { UserType } from "../../types/userType";
import axiosClient from "./axiosClient";

export const orderApi = {
  getOrders: (userId: string) => axiosClient.get(`/orders/user/${userId}`),
  createOrder: (user: UserType, order: OrderItemType) =>
    axiosClient.post(`/orders/user/${user._id}`, { user, order }),
  updateStatusOrder: (userId: string, orderId: string, status: PayStatus) =>
    axiosClient.put(`/orders/${orderId}/user/${userId}`, { status }),
  delete: (userId: string) => axiosClient.patch(`/orders/user/${userId}`),
};
