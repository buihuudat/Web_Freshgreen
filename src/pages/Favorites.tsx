import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { favoriteActions } from "../actions/favoriteActions";
import { Box, CircularProgress } from "@mui/material";
import { RootState } from "../redux/store";
import ProductCard from "../components/common/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { ProductType } from "../types/productType";

const Favorites = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const { favoriteProducts } = useAppSelector(
    (state: RootState) => state.favorite
  );

  useEffect(() => {
    dispatch(favoriteActions.get(user._id as string));
  }, [dispatch, user._id]);

  return favoriteProducts.length ? (
    <Box display={"flex"} flexDirection={"row"} gap={10} flexWrap={"wrap"}>
      {favoriteProducts.map((product: ProductType, index: number) => (
        <ProductCard product={product} key={index} />
      ))}
    </Box>
  ) : (
    <Box display={"flex"} justifyContent={"center"}>
      <CircularProgress />
    </Box>
  );
};

export default Favorites;
