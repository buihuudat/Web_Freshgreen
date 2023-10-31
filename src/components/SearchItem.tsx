import { memo } from "react";
import { ProductType } from "../types/productType";
import { Avatar, Paper, Typography } from "@mui/material";
import { moneyFormat } from "../utils/handlers/moneyFormat";
import { mainColor } from "../constants/colors";
import { useNavigate } from "react-router-dom";
import { setItem } from "../utils/handlers/tokenHandler";

const SearchItem = memo((product: ProductType) => {
  const navigate = useNavigate();
  const handleViewProduct = () => {
    navigate(`/san-pham/details/` + product.title, {
      state: { productId: product._id as string },
    });
    setItem("productId", product._id);
  };
  return (
    <Paper
      onClick={handleViewProduct}
      sx={{
        padding: 1,
        mb: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      <Avatar src={product.images[0]} />
      <Typography sx={{ width: "70%" }}>{product.title}</Typography>
      <Typography color={mainColor} fontWeight={600}>
        {moneyFormat(product.price)}
      </Typography>
    </Paper>
  );
});

export default SearchItem;
