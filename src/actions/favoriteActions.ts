import { createAsyncThunk } from "@reduxjs/toolkit";
import { favoriteApi } from "../utils/api/favoriteApi";
import { NotificationToast } from "../utils/handlers/NotificationToast";

export const favoriteActions = {
  get: createAsyncThunk("favorite/get", async (userId: string) => {
    try {
      const res = await favoriteApi.get(userId);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  update: createAsyncThunk<any, { userId: string; productId: string }>(
    "favorite/update",
    async ({ userId, productId }) => {
      try {
        await favoriteApi.update({ userId, productId });
        return true;
      } catch (error) {
        NotificationToast({
          message: "!Oppps...",
          type: "error",
        });
        throw error;
      }
    }
  ),
};
