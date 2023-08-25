import { Box, Button, Typography } from "@mui/material";
import React, { memo, useMemo } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Banner2 } from "../../../utils/Constants/images";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, FreeMode } from "swiper/modules";
import ProductCard from "../../../components/common/ProductCard";
import { DealsOfTheDayType } from "../../../types/homeType";
import {
  InitialSortProduct,
  filterDataProducts,
} from "../../../utils/handlers/filterDataProduct";
import { ProductType } from "../../../types/productType";
import SkeletonCard from "../../../components/SkeletonCard";

const BestSellers = memo(({ products }: { products: ProductType[] }) => {
  const customSwiper: DealsOfTheDayType = {
    spaceBetween: 30,
    slidesPerView: 4,
    watchSlidesProgress: false,
    freeMode: true,
    centeredSlides: false,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, FreeMode],
  };
  const navigate = useNavigate();

  const dataProducts = useMemo(
    () => filterDataProducts({ ...InitialSortProduct, products }),
    [products]
  );

  return (
    <Box py={3}>
      <Typography fontWeight={600} fontSize={35} pb={3}>
        Bán chạy nhất trong ngày
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Box
          borderRadius={5}
          p={5}
          pt={60}
          width={"25%"}
          height={700}
          sx={{
            background: `url(${Banner2}) no-repeat`,
            backgroundSize: 300,
            backgroundColor: "#A7E6C4",
          }}
        >
          <Typography fontWeight={600} fontSize={30}>
            Khám khá thêm những sản phẩm mới
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("san-pham")}
          >
            Mua ngay <ArrowRightAltIcon />
          </Button>
        </Box>

        <Box width={"70%"}>
          {dataProducts.length ? (
            <Swiper {...customSwiper} style={{ width: "100%" }}>
              {dataProducts.map((data, index) => (
                <SwiperSlide
                  key={index}
                  style={{ display: "block", width: 600 }}
                >
                  <ProductCard product={data} width={280} fast={true} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Box display={"flex"} flexDirection={"row"} gap={5}>
              <SkeletonCard width={280} />
              <SkeletonCard width={280} />
              <SkeletonCard width={280} />
              <SkeletonCard width={280} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
});

export default BestSellers;
