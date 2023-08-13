import {
  FeaturedCategoryDataType,
  HomeAdsDataType,
} from "../../../../types/homeType";
import {
  HomeAds1,
  HomeAds2,
  HomeAds3,
} from "../../../../utils/Constants/images";

export const FeaturedCategoryData: FeaturedCategoryDataType[] = [
  {
    image: "",
    title: "Rau",
    count: 10,
    color: "green",
  },
  {
    image: "",
    title: "Hải sản",
    count: 5,
    color: "blue",
  },
  {
    image: "",
    title: "Thịt",
    count: 3,
    color: "red",
  },
  {
    image: "",
    title: "Trái cây",
    count: 8,
    color: "orange",
  },
  {
    image: "",
    title: "Mì gói",
    count: 6,
    color: "yellow",
  },
  {
    image: "",
    title: "Đồ chay",
    count: 4,
    color: "brown",
  },
  {
    image: "",
    title: "Đồ uống",
    count: 7,
    color: "purple",
  },
  {
    image: "",
    title: "Sữa",
    count: 9,
    color: "pink",
  },
];

export const HomeAdsData: HomeAdsDataType[] = [
  {
    image: HomeAds1,
    title: "Sạch sẽ hàng ngày với các sản phẩm của chúng tôi",
    category: "news",
  },
  {
    image: HomeAds2,
    title: "Nẫu bữa sáng của bạn lành mạnh và dễ dàng",
    category: "easy",
  },
  {
    image: HomeAds3,
    title: "Các sản phẩm hữu cơ tốt nhất trực tuyến",
    category: "online",
  },
];
