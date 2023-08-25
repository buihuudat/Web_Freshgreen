import { createAsyncThunk } from "@reduxjs/toolkit";
import commentApi from "../utils/api/commentApi";

const commentActions = {
  getProductComments: createAsyncThunk(
    "comment/product/gets",
    async (productId: string) => {
      try {
        const res = await commentApi.getProductComment(productId);
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),

  addComment: createAsyncThunk<
    any,
    { userId: string; productId: string; comment: string }
  >("/comment/add", async ({ userId, productId, comment }) => {
    try {
      const res = await commentApi.addComment({ userId, productId, comment });
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
};

export default commentActions;
