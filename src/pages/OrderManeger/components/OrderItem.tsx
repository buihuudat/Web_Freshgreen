import { memo, useEffect, useState } from "react";
import { OrderItemType } from "../../../types/orderType";
import { Box, Paper } from "@mui/material";
import OrderProductItem from "./OrderProductItem";
import { ProductCartType } from "../../../types/cartType";
import { LoadingButton } from "@mui/lab";
import { InitialUser, UserType } from "../../../types/userType";
import { userActions } from "../../../actions/userActions";
import UserInfo from "./UserInfo";
import BillInfo from "./BillInfo";
interface Props {
  order: OrderItemType;
  user: string;
}

const OrderItem = memo((props: Props) => {
  const [userInfo, setUserInfo] = useState<UserType>(InitialUser);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState({
    user: true,
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const user: UserType = await userActions.getUser(props.user);
        setUserInfo(user);
        setAddress(
          user.address.more +
            " " +
            user.address.street +
            " " +
            user.address.ward +
            " " +
            user.address.district +
            " " +
            user.address.city +
            " "
        );
        setIsLoading({ user: false });
      } catch (error) {
        return false;
      }
    };
    getUser();
  }, [props.user]);

  return (
    <Box sx={{ m: 3, outline: "1px solid #ddd", width: 450 }}>
      {/* customer information */}
      <UserInfo user={userInfo} address={address} isLoading={isLoading.user} />

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

      {/* <Box sx={{ display: "flex", gap: 1, p: 1 }}>
        <LoadingButton fullWidth color="error" variant="outlined">
          Hủy đơn hàng
        </LoadingButton>
        <LoadingButton fullWidth color="success" variant="contained">
          Xác nhận đơn hàng
        </LoadingButton>
      </Box> */}
    </Box>
  );
});

export default OrderItem;
