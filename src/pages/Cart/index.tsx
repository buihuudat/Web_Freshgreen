import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import CartProductItem from "./components/CartProductItem";
import { ProductCartType } from "../../types/cartType";
import PayInformation from "./components/PayInformation";

const Cart = () => {
  const cart = useAppSelector((state: RootState) => state.cart.data);

  return (
    <Box>
      <Typography align="center" fontWeight={600} fontSize={32}>
        {!cart.products.length
          ? "Giỏ hàng trống"
          : ` Có ${cart.products.length} sản phẩm trong giỏ hàng`}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          height={505}
          width={"70%"}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            p: 3,
            my: 5,
            overflowY: "auto",
          }}
        >
          {cart?.products &&
            cart.products.map((product: ProductCartType) => (
              <CartProductItem product={product} key={product._id} />
            ))}
        </Box>

        {cart.products.length > 0 && <PayInformation />}
      </Box>
    </Box>
  );
};

export default Cart;
