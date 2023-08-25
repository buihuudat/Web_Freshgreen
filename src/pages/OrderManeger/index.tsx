import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { orderActions } from "../../actions/orderActions";
import { RootState } from "../../redux/store";
import { Box, CircularProgress, Typography } from "@mui/material";
import OrderItem from "./components/OrderItem";
import { OrderItemType, OrderStatus } from "../../types/orderType";
import Tabs from "./components/Tabs";

const OrderManager = () => {
  const { data: dataOrder, loading } = useAppSelector(
    (state: RootState) => state.order
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);

  const [value, setValue] = useState<OrderStatus>(OrderStatus.pending);
  const [orders, setOrders] = useState<OrderItemType[] | undefined>(dataOrder);

  useEffect(() => {
    dispatch(orderActions.getOrders(user._id as string));
  }, [dispatch, user._id]);

  useEffect(() => {
    setOrders(
      dataOrder.filter(
        (order: OrderItemType) =>
          order.status !== OrderStatus.done && order.status === value
      )
    );
  }, [dataOrder, value]);

  return loading ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : !dataOrder.length ? (
    <Typography align="center" fontSize={23} fontWeight={600}>
      Chưa có đơn hàng
    </Typography>
  ) : (
    <Box>
      <Tabs value={value} setValue={setValue} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {orders?.map((order: OrderItemType) => (
          <OrderItem order={order} user={user} key={order._id} />
        ))}
      </Box>
    </Box>
  );
};

export default OrderManager;
