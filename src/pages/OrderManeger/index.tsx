import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { orderActions } from "../../actions/orderActions";
import { RootState } from "../../redux/store";
import { Box } from "@mui/material";
import OrderItem from "./components/OrderItem";

const OrderManager = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const dataOrder = useAppSelector((state: RootState) => state.order.data);

  useEffect(() => {
    dispatch(orderActions.getOrders(user._id as string));
  }, [dispatch, user._id]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 5 }}
    >
      {dataOrder?.orders.map((order) => (
        <OrderItem {...order} key={order._id} />
      ))}
    </Box>
  );
};

export default OrderManager;
