import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { orderActions } from "../../actions/orderActions";
import { RootState } from "../../redux/store";
import { Box, CircularProgress } from "@mui/material";
import OrderItem from "./components/OrderItem";
import { OrderItemType } from "../../types/orderType";

const OrderManager = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const { data: dataOrder, loading } = useAppSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    dispatch(orderActions.getOrders(user._id as string));
  }, [dispatch, user._id]);

  return loading ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <Box
      sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10 }}
    >
      {dataOrder?.orders.map((order: OrderItemType) => (
        <OrderItem order={order} user={dataOrder.user} key={order._id} />
      ))}
    </Box>
  );
};

export default OrderManager;
