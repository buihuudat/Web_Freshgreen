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
};

export default commentActions;
