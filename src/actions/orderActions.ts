import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderApi } from "../utils/api/orderApi";
import { OrderItemType } from "../types/orderType";
import { NotificationToast } from "../utils/handlers/NotificationToast";

export const orderActions = {
  getOrders: createAsyncThunk("/order/gets", async (userId: string) => {
    try {
      const res = await orderApi.getOrders(userId);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  createOrder: createAsyncThunk<any, { userId: string; order: OrderItemType }>(
    "/order/create",
    async ({ userId, order }) => {
      try {
        const res = await orderApi.createOrder(userId, order);
        NotificationToast({ message: "Đơn hàng đã được đặt", type: "success" });
        return res.data;
      } catch (error) {
        NotificationToast({ message: "Đặt hàng thất bại", type: "error" });
        throw error;
      }
    }
  ),
};
