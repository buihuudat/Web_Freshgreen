import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { favoriteActions } from "../actions/favoriteActions";

const Favorites = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const favorites = useAppSelector((state) => state.favorite.favoriteProducts);
  console.log(favorites);

  useEffect(() => {
    dispatch(favoriteActions.get(user._id as string));
  }, [dispatch, user._id]);
  return <div>Favorites</div>;
};

export default Favorites;
