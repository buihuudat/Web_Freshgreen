import {
  Box,
  Button,
  IconButton,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { mainColor } from "../../../constants/colors";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect, useMemo, useState } from "react";
import { productActions } from "../../../actions/productActions";
import { RootState } from "../../../redux/store";
import ProductCard from "../../../components/common/ProductCard";
import React from "react";
import { ProductType } from "../../../types/productType";
import { shopActions } from "../../../actions/shopActions";
import { getItem } from "../../../utils/handlers/tokenHandler";

const StoreDetails = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [productsResearch, setProductsResearch] = useState<ProductType[]>([]);
  const { state } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(shopActions.get(state || getItem("shopId")));
    dispatch(productActions.getShopProducts(state));
  }, [dispatch, state]);

  const { products, totalProducts } = useAppSelector(
    (state: RootState) => state.product.shopProducts
  );
  const store = useAppSelector((state: RootState) => state.shop.shop);

  const preProducts: ProductType[] = useMemo(() => [...products], [products]);

  const handleSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  useEffect(() => {
    setProductsResearch(
      preProducts.filter(
        (product: ProductType) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [preProducts, searchQuery]);

  return (
    <Box>
      <Typography
        fontWeight={600}
        fontSize={60}
        align="center"
        fontFamily={"Nunito"}
        textTransform={"capitalize"}
      >
        {store.name}
      </Typography>

      <Typography
        align="center"
        textTransform={"capitalize"}
        fontStyle={"italic"}
      >
        {store.bio}
      </Typography>

      {/* search */}
      <Paper
        variant="outlined"
        sx={{
          width: { sm: 500, xs: "100%" },
          display: "flex",
          flexDirection: "row",
          m: "0 auto",
          my: 5,
        }}
      >
        <TextField
          sx={{
            outline: "none",
            border: "none",
            ":hover": {
              outline: `2px solid ${mainColor}`,
            },
          }}
          onChange={handleSearch}
          placeholder="Tìm sản phẩm trong cửa hàng..."
          fullWidth
        />
        <Button
          sx={{ width: "max-content" }}
          variant="contained"
          color="success"
        >
          Search
        </Button>
      </Paper>

      <Box
        display={"flex"}
        flexDirection={{ sm: "row", xs: "column" }}
        gap={"5%"}
      >
        <Box width={{ sm: "20%", sx: "100%" }}>
          <Paper sx={{ background: "#A6DEC1", p: 3 }}>
            <img
              src={store.image}
              alt={store.name}
              style={{ width: 150, height: 150, objectFit: "cover" }}
            />
            <Typography fontSize={15} color={"#555"}>
              Kể từ {store.startYear}
            </Typography>
            <Typography
              fontWeight={600}
              fontSize={23}
              textTransform={"capitalize"}
            >
              {store.name}
            </Typography>
            <Box display={"flex"} flexDirection={"row"}>
              <Rating
                name="half-rating"
                defaultValue={store.star?.count}
                precision={0.5}
                readOnly
              />
              <Typography>({store.averageStarRating})</Typography>
            </Box>

            <Typography textTransform={"capitalize"} fontStyle={"italic"}>
              {store.bio}
            </Typography>

            <Typography>Theo chúng tôi</Typography>
            <Box>
              <IconButton>
                <FacebookIcon />
              </IconButton>
              <IconButton>
                <TwitterIcon />
              </IconButton>
              <IconButton>
                <InstagramIcon />
              </IconButton>
            </Box>
            <Typography>
              <LocationOnIcon sx={{ color: mainColor, fontSize: 18 }} />
              <b>Địa chỉ: </b>
              {store.user?.address.city}
            </Typography>
            <Typography>
              <LocalPhoneIcon sx={{ color: mainColor, fontSize: 18 }} />
              <b>Số điện thoại: </b>
              {store.user?.phone}
            </Typography>
            <Typography>
              <LocalPhoneIcon sx={{ color: mainColor, fontSize: 18 }} />
              <b>Sản phẩm: </b>
              {totalProducts}
            </Typography>
          </Paper>
        </Box>
        {/* products store */}
        <Box
          width={"75%"}
          sx={{
            alignItems: "end",
            float: "right",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {productsResearch.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default StoreDetails;
