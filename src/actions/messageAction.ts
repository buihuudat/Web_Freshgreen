import { createAsyncThunk } from "@reduxjs/toolkit";
import { messageApi } from "../utils/api/messageApi";

export const messageActions = {
  ask: createAsyncThunk<any, { message: string; userId: string }>(
    "message/ask-ai",
    async ({ message, userId }) => {
      try {
        const res = await messageApi.ask({ message, userId });
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),
};
