import { createSlice } from "@reduxjs/toolkit";
import { orderActions } from "../../actions/orderActions";
import { OrderType } from "../../types/orderType";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";

interface InitialStateProps {
  data: OrderType | null;
  loading: boolean;
}
const initialState: InitialStateProps = {
  data: null,
  loading: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(orderActions.getOrders.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(orderActions.createOrder.fulfilled, (state, action) => {
        state.data?.orders.push(action.payload);
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        (action) =>
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default orderSlice.reducer;
