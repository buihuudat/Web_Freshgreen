import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { productActions } from "../../actions/productActions";

import ProductList from "./components/ProductList";
import BoxFilter from "./components/BoxFilter";
import { ProductType } from "../../types/productType";

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, totalProducts } = useAppSelector(
    (state: RootState) => state.product
  );
  const numberOfProductShow: number = 8;

  const [isShow, setIsShow] = useState<boolean>(false);
  const [countPage, setCountPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsFilter, setProductsFilter] = useState<ProductType[]>(products);

  useEffect(() => {
    dispatch(
      productActions.gets({ page: currentPage, perPage: numberOfProductShow })
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, currentPage]);

  useEffect(() => {
    setCountPage(Math.ceil(totalProducts / numberOfProductShow));
  }, [totalProducts]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="success"
        size="large"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: 160,
          height: 60,
          p: 1,
        }}
        onClick={() => setIsShow(!isShow)}
      >
        <FilterAltIcon />
        <Typography fontSize={15} fontWeight={600}>
          Bộ lọc
        </Typography>
        <ArrowDropDownIcon />
      </Button>

      <BoxFilter
        isShow={isShow}
        products={products}
        setProductsFilter={setProductsFilter}
      />

      <ProductList products={productsFilter} />

      <Stack
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          p: 5,
        }}
      >
        <Pagination
          onChange={handleChangePage}
          count={countPage}
          variant="outlined"
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default Products;
