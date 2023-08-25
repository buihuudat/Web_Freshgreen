import React, { useMemo, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { Box, LinearProgress } from "@mui/material";
import { OrderStatus } from "../types/orderType";
import OrderItem from "./OrderManeger/components/OrderItem";
// import Pagini from "../components/Pagini";

const Bought = () => {
  const { data, loading } = useAppSelector((state) => state.order);
  // const [currentPage, setCurrentPage] = useState<number>(1);

  const { user } = useAppSelector((state) => state.user);
  const orders = useMemo(
    () => data.filter((order) => order.status === OrderStatus.done),
    [data]
  );
  return loading ? (
    <LinearProgress />
  ) : (
    <div>
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
        {orders.map((order) => (
          <OrderItem order={order} user={user} key={order._id} />
        ))}
      </Box>
      {/* <Pagini countPage={1} setCurrentPage={setCurrentPage} /> */}
    </div>
  );
};

export default Bought;
