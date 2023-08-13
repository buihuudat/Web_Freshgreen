import { Box, Skeleton, Typography } from "@mui/material";
import ProductCard from "../../../components/common/ProductCard";
import { ProductType } from "../../../types/productType";
import { memo, useMemo } from "react";
import {
  InitialSortProduct,
  filterDataProducts,
} from "../../../utils/handlers/filterDataProduct";

const HomeProducts = memo(({ products }: { products: ProductType[] }) => {
  const popularProducts = useMemo(
    () =>
      filterDataProducts({
        ...InitialSortProduct,
        products,
        slice: 8,
        sold: 0,
      }),
    [products]
  );

  return popularProducts.length ? (
    <Box py={3}>
      <Typography fontWeight={600} fontSize={35} pb={3}>
        Sản phẩm phổ biến
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        alignItems={"center"}
        gap={5}
        justifyContent={"space-between"}
      >
        {popularProducts.map((product: ProductType, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </Box>
    </Box>
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  );
});

export default HomeProducts;
