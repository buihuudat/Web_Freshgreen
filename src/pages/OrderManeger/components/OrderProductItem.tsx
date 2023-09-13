import { Box, Typography } from "@mui/material";
import React from "react";
import { ProductCartType } from "../../../types/cartType";
import { moneyFormat } from "../../../utils/handlers/moneyFormat";
import { mainColor } from "../../../utils/Constants/colors";
import { NavigateOptions, useNavigate } from "react-router-dom";

const OrderProductItem = (product: ProductCartType) => {
  const navigate = useNavigate();
  const state = { product } as NavigateOptions;

  const viewProduct = () => {
    navigate(`/san-pham/details/${product.title}`, { state });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: { sm: 2, xs: 1 },
        p: 1,
      }}
    >
      <img
        src={product.images[0]}
        alt={product.title}
        style={{
          width: window.innerWidth > 600 ? 60 : 40,
          height: window.innerWidth > 600 ? 60 : 40,
          objectFit: "cover",
        }}
      />
      <Typography
        fontWeight={600}
        fontSize={{ sm: 18, xs: 15 }}
        textTransform={"capitalize"}
        sx={{ width: { sm: 140, xs: 150 }, cursor: "pointer" }}
        onClick={viewProduct}
      >
        {product.title.length > 9
          ? product.title.slice(0, 9) + "..."
          : product.title}
      </Typography>
      <Typography fontSize={{ sm: 16, xs: 15 }} fontWeight={600}>
        {moneyFormat(product.lastPrice)}
      </Typography>
      <Typography fontSize={14}>x{product.count}</Typography>
      <Typography
        fontSize={{ sm: 23, xs: 17 }}
        fontWeight={600}
        color={mainColor}
      >
        {moneyFormat(product.lastPrice * product.count)}
      </Typography>
    </Box>
  );
};

export default OrderProductItem;
