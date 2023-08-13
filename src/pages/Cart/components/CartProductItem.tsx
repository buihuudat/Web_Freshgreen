import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import { memo } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { moneyFormat } from "../../../utils/handlers/moneyFormat";
import ClearIcon from "@mui/icons-material/Clear";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { ProductCartType } from "../../../types/cartType";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { cartActions } from "../../../actions/cartActions";
import { RootState } from "../../../redux/store";

const CartProductItem = memo(({ product }: { product: ProductCartType }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = { product } as NavigateOptions;
  const cartId = useAppSelector((state: RootState) => state.cart.data)._id;

  const handleUp = () => {
    dispatch(
      cartActions.upCountProduct({
        cartId: cartId as string,
        productId: product._id as string,
      })
    );
  };
  const handleDown = () => {
    dispatch(
      cartActions.downCountProduct({
        cartId: cartId as string,
        productId: product._id as string,
      })
    );
  };
  const handleDeleteProduct = () => {
    dispatch(
      cartActions.removeProduct({
        cartId: cartId as string,
        productId: product._id as string,
      })
    );
  };

  return (
    <Paper
      elevation={8}
      sx={{
        p: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 3,
        }}
      >
        <img
          src={product?.images[0]}
          alt={product.title}
          style={{ width: 80, height: 80, objectFit: "cover" }}
        />
        <Typography
          fontWeight={600}
          fontSize={23}
          textTransform={"capitalize"}
          sx={{ cursor: "pointer" }}
          onClick={() =>
            navigate(`/san-pham/details/${product.title}`, { state })
          }
        >
          {product.title.length > 10
            ? product.title.slice(0, product.title.length) + "..."
            : product.title}
        </Typography>
      </Box>

      <Box display={"flex"} flexDirection={"row"} gap={8} alignItems={"center"}>
        <Typography fontSize={20} fontWeight={600} color={"orange"}>
          -{product.discount}%
        </Typography>
        <Typography color={"#999"} sx={{ textDecoration: "line-through" }}>
          {moneyFormat(product.price)}
        </Typography>
        <Typography
          fontSize={22}
          color={"#62BD19"}
          fontWeight={600}
          sx={{ width: 100 }}
          align="right"
        >
          {moneyFormat(product.lastPrice)}
        </Typography>

        <Box display={"flex"} gap={1}>
          <IconButton color="warning" onClick={handleDown}>
            <RemoveIcon />
          </IconButton>
          <TextField
            value={product.count}
            sx={{ width: 30 }}
            variant="standard"
          />
          <IconButton color="primary" onClick={handleUp}>
            <AddIcon />
          </IconButton>
        </Box>

        <Typography
          fontSize={35}
          fontWeight={600}
          color={"#333"}
          sx={{ width: 150 }}
          align="right"
        >
          {moneyFormat(product.count * product.lastPrice)}
        </Typography>

        <IconButton color="error" onClick={handleDeleteProduct}>
          <ClearIcon />
        </IconButton>
      </Box>
    </Paper>
  );
});

export default CartProductItem;
