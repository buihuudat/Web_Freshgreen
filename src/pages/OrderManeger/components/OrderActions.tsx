import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import {
  OrderItemType,
  OrderStatus,
  PayMethod,
} from "../../../types/orderType";
import { memo } from "react";
import { UserType } from "../../../types/userType";

interface Props {
  order: OrderItemType;
  user: UserType;
}
const OrderActions = memo((props: Props) => {
  const { order } = props;

  const handleCancel = () => {};

  return (
    <Box>
      {order.status === OrderStatus.spending && (
        <Box sx={{ display: "flex", gap: 1, p: 1, flexDirection: "column" }}>
          <LoadingButton
            fullWidth
            color="primary"
            variant="text"
            disabled
            onClick={handleCancel}
          >
            {order.pay.method === PayMethod.payNow
              ? "Người bán đang chuẩn bị hàng"
              : "Chờ xác nhận"}
          </LoadingButton>
          <LoadingButton
            fullWidth
            color="error"
            variant="outlined"
            onClick={handleCancel}
          >
            Hủy đơn hàng
          </LoadingButton>{" "}
        </Box>
      )}
      {order.status === OrderStatus.success && (
        <Box sx={{ display: "flex", gap: 1, p: 1, flexDirection: "column" }}>
          <LoadingButton
            disabled
            fullWidth
            color="secondary"
            variant="text"
            onClick={handleCancel}
          >
            Đang giao hàng
          </LoadingButton>
          <LoadingButton
            fullWidth
            color="success"
            variant="contained"
            onClick={handleCancel}
          >
            Đã nhận được hàng
          </LoadingButton>
        </Box>
      )}
    </Box>
  );
});

export default OrderActions;
