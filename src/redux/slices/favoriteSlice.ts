import { createSlice } from "@reduxjs/toolkit";
import { favoriteActions } from "../../actions/favoriteActions";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";
import { getItem, setItem } from "../../utils/handlers/tokenHandler";
import { ProductType } from "../../types/productType";

interface InitialStateProps {
  favoriteProducts: ProductType[];
  loading: boolean;
  isFavorite: boolean;
}

const initialState: InitialStateProps = {
  favoriteProducts: getItem("favorite") || [],
  loading: false,
  isFavorite: false,
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    checkFavorite: (state, action) => {
      state.isFavorite = state.favoriteProducts.some(
        (product: ProductType) => product._id === action.payload
      );
    },
    clearFavorite: (state) => {
      state.favoriteProducts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(favoriteActions.get.fulfilled, (state, action) => {
        if (action.payload) {
          const products = action.payload.products;
          const updateFvorite = products.map(
            ({ product }: { product: ProductType }) => product
          );
          state.favoriteProducts = [...updateFvorite];
          setItem("favorite", [...updateFvorite]);
        }
      })
      .addCase(favoriteActions.update.fulfilled, (state, action) => {
        const id = action.payload._id;
        const index = state.favoriteProducts.findIndex(
          (product) => product._id === id
        );

        if (index !== -1) {
          state.favoriteProducts = state.favoriteProducts.filter(
            (product) => product._id !== id
          );
        } else {
          state.favoriteProducts.push(action.payload);
        }

        setItem("favorite", state.favoriteProducts);
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

export const { checkFavorite, clearFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
