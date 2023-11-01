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
import { setItem } from "../../../utils/handlers/tokenHandler";

const CartProductItem = memo(({ product }: { product: ProductCartType }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);

  const handleUp = () => {
    dispatch(
      cartActions.upCountProduct({
        userId: user?._id!,
        productId: product._id as string,
      })
    );
  };
  const handleDown = () => {
    dispatch(
      cartActions.downCountProduct({
        userId: user?._id!,
        productId: product._id as string,
      })
    );
  };
  const handleDeleteProduct = () => {
    dispatch(
      cartActions.removeProduct({
        userId: user?._id!,
        productId: product._id as string,
      })
    );
  };

  const handleViewProduct = () => {
    navigate(`/san-pham/details/` + product.title, {
      state: { productId: product._id as string },
    });
    setItem("productId", product._id);
  };

  return (
    <Paper
      elevation={8}
      sx={{
        p: { sm: 1, xs: 0 },
        display: "flex",
        flexDirection: { sm: "row", xs: "column" },
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: { sm: 3, xs: 1 },
        }}
      >
        <img
          src={product?.images[0]}
          alt={product.title}
          style={{ width: 80, height: 80, objectFit: "cover" }}
        />
        <Typography
          fontWeight={600}
          fontSize={{ sm: 23, xs: 16 }}
          textTransform={"capitalize"}
          sx={{ cursor: "pointer" }}
          onClick={handleViewProduct}
        >
          {product.title.length > 10
            ? product.title.slice(0, product.title.length) + "..."
            : product.title}
        </Typography>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"row"}
        gap={{ sm: 8, xs: 2 }}
        alignItems={"center"}
        flexWrap={{ sm: "nowrap", xs: "wrap" }}
        p={1}
      >
        {product.discount > 0 && (
          <Typography
            fontSize={{ sm: 20, xs: 13 }}
            fontWeight={600}
            color={"orange"}
          >
            -{product.discount}%
          </Typography>
        )}
        {product.discount > 0 && (
          <Typography color={"#999"} sx={{ textDecoration: "line-through" }}>
            {moneyFormat(product.price)}
          </Typography>
        )}
        <Typography
          fontSize={{ sm: 22, xs: 13 }}
          color={"#62BD19"}
          fontWeight={600}
          sx={{ width: { sm: 100, xs: 50 } }}
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
          fontSize={{ sm: 35, xs: 25 }}
          fontWeight={600}
          color={"#333"}
          sx={{ width: { sm: 150, xs: 200 } }}
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
