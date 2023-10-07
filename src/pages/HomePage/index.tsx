import { Box } from "@mui/material";
import HomeSwiper from "./components/HomeSwiper";
import HomeFeaturedCategory from "./components/HomeFeaturedCategory";
import HomeAds from "./components/HomeAds";
import HomeProducts from "./components/HomeProducts";
import BestSellers from "./components/BestSellers";
import HomeSale from "./components/HomeSale";
import { productActions } from "../../actions/productActions";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { settingsActions } from "../../actions/settingsActionts";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: RootState) => state.product.products);
  const { images } = useAppSelector(
    (state: RootState) => state.settings.banners
  );

  useEffect(() => {
    dispatch(productActions.gets({ page: 1, perPage: 8 }));
    dispatch(settingsActions.getBanner());
  }, [dispatch]);

  return (
    <Box>
      <HomeSwiper images={images} />
      {/* danh muc noi bat */}
      <HomeFeaturedCategory />

      {/*  ads */}
      <HomeAds />

      {/* home products */}
      <HomeProducts products={products} />

      {/* deals of the day */}
      <BestSellers products={products} />

      {/* sale in day */}
      <HomeSale products={products} />
    </Box>
  );
};

export default HomePage;
