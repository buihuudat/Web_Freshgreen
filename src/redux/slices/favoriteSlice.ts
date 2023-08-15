import { createSlice } from "@reduxjs/toolkit";
import { favoriteActions } from "../../actions/favoriteActions";
import { FavoriteProducts } from "../../types/favoriteType";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";

interface InitialStateProps {
  favoriteProducts: FavoriteProducts[];
  loading: boolean;
}

const initialState: InitialStateProps = {
  favoriteProducts: [],
  loading: false,
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(favoriteActions.get.fulfilled, (state, action) => {
        state.favoriteProducts = action.payload.products;
      })
      .addCase(favoriteActions.update.fulfilled, (state, action) => {
        state.favoriteProducts.push(action.payload);
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

export default favoriteSlice.reducer;
