import { Box, Typography } from "@mui/material";
import React from "react";
import { ProductCartType } from "../../../types/cartType";
import { moneyFormat } from "../../../utils/handlers/moneyFormat";
import { mainColor } from "../../../utils/Constants/colors";
import { NavigateOptions, useNavigate } from "react-router-dom";

const OrderProductItem = (product: ProductCartType) => {
  console.log(product);

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
        gap: 3,
        width: 400,
        p: 1,
      }}
    >
      <img
        src={product.images[0]}
        alt={product.title}
        style={{ width: 60, height: 60, objectFit: "cover" }}
      />
      <Typography
        fontWeight={600}
        fontSize={20}
        textTransform={"capitalize"}
        sx={{ width: 150, cursor: "pointer" }}
        onClick={viewProduct}
      >
        {product.title.length > 10
          ? product.title.slice(0, 10) + "..."
          : product.title}
      </Typography>
      <Typography fontSize={14}>x{product.count}</Typography>
      <Typography fontSize={23} fontWeight={600} color={mainColor}>
        {moneyFormat(product.lastPrice)}
      </Typography>
    </Box>
  );
};

export default OrderProductItem;
