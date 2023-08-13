import { memo } from "react";
import { OrderItemType } from "../../../types/orderType";
import { Box, Paper } from "@mui/material";
import OrderProductItem from "./OrderProductItem";
import { ProductCartType } from "../../../types/cartType";
import { LoadingButton } from "@mui/lab";

const OrderItem = memo((order: OrderItemType) => {
  return (
    <Box sx={{ m: 3, outline: "1px solid #ddd" }}>
      {/* customer information */}
      <Box></Box>

      {/* product list */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          height: 300,
          overflowY: "auto",
          p: 1,
        }}
      >
        {order.products.map((product: ProductCartType) => (
          <Paper elevation={8}>
            <OrderProductItem {...product} key={product._id} {...product} />
          </Paper>
        ))}
      </Box>

      {/* bill information */}
      <Box></Box>

      {/* actions for bill */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <LoadingButton fullWidth color="error" variant="outlined">
          Hủy đơn hàng
        </LoadingButton>
        <LoadingButton fullWidth color="success" variant="contained">
          Xác nhận đơn hàng
        </LoadingButton>
      </Box>
    </Box>
  );
});

export default OrderItem;
