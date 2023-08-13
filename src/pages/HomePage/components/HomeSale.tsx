import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { DealsOfTheDayType } from "../../../types/homeType";
import { memo } from "react";
import { ProductType } from "../../../types/productType";
import ProductSaleCard from "../../../components/common/ProductSaleCard";

const HomeSale = memo(({ products }: { products: ProductType[] }) => {
  const customSwiper: DealsOfTheDayType = {
    spaceBetween: 30,
    slidesPerView: 4,
    watchSlidesProgress: true,
    freeMode: true,
    centeredSlides: false,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, FreeMode],
  };
  return (
    <Box>
      <Typography fontWeight={600} fontSize={35} pb={3}>
        Ưu đãi trong ngày
      </Typography>

      <Box>
        <Swiper {...customSwiper} style={{ width: "100%" }}>
          {products.map((data: ProductType, index: number) => (
            <SwiperSlide key={index} style={{ display: "block", width: 600 }}>
              <ProductSaleCard product={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
});

export default HomeSale;
