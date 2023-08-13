import { Box } from "@mui/material";
import React, { memo } from "react";
import { ProductType } from "../../../types/productType";
import ProductCard from "../../../components/common/ProductCard";

const ProductList = memo(({ products }: { products: ProductType[] }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      flexWrap={"wrap"}
      gap={5}
      justifyContent={"space-between"}
    >
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </Box>
  );
});

export default ProductList;
