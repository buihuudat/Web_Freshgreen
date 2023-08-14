import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderApi } from "../utils/api/orderApi";
import { OrderItemType } from "../types/orderType";
import { NotificationToast } from "../utils/handlers/NotificationToast";
import { removeItem } from "../utils/handlers/tokenHandler";
import { UserType } from "../types/userType";

export const orderActions = {
  getOrders: createAsyncThunk("/order/gets", async (userId: string) => {
    try {
      const res = await orderApi.getOrders(userId);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  createOrder: createAsyncThunk<any, { user: UserType; order: OrderItemType }>(
    "/order/create",
    async ({ user, order }) => {
      try {
        const res = await orderApi.createOrder(user, order);
        NotificationToast({ message: "Đơn hàng đã được đặt", type: "success" });
        removeItem("cart");
        return res.data;
      } catch (error) {
        NotificationToast({ message: "Đặt hàng thất bại", type: "error" });
        throw error;
      }
    }
  ),
};
