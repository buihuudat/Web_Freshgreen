import { createSlice } from "@reduxjs/toolkit";
import { payActions } from "../../actions/payActions";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";

interface InitialStateProps {
  client_secret: string;
  amount: number;
  loading: boolean;
}

const initialState: InitialStateProps = {
  client_secret: "",
  amount: 0,
  loading: false,
};

export const paySlice = createSlice({
  name: "pay",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(payActions.payment.fulfilled, (state, action) => {
        return {
          ...state,
          client_secret: action.payload.client_secret,
        };
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

export default paySlice.reducer;
