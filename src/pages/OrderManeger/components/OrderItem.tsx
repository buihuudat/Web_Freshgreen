import { memo } from "react";
import { OrderItemType } from "../../../types/orderType";
import { Box, Paper } from "@mui/material";
import OrderProductItem from "./OrderProductItem";
import { ProductCartType } from "../../../types/cartType";
import { UserType, addressOfUser } from "../../../types/userType";
import UserInfo from "./UserInfo";
import BillInfo from "./BillInfo";
import OrderActions from "./OrderActions";
interface Props {
  order: OrderItemType;
  user: UserType;
}

const OrderItem = memo((props: Props) => {
  const { user } = props;

  return (
    <Paper
      sx={{ m: { sm: 3, xs: 1 }, width: { sm: 480, xs: "100%" } }}
      elevation={9}
    >
      {/* customer information */}
      <UserInfo
        user={user}
        address={addressOfUser(user.address)!}
        isLoading={!user.address}
      />

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
        {props.order.products.map((product: ProductCartType) => (
          <Paper elevation={8} key={product._id}>
            <OrderProductItem {...product} />
          </Paper>
        ))}
      </Box>

      <BillInfo {...props.order} />

      <OrderActions {...props} />
    </Paper>
  );
});

export default OrderItem;
