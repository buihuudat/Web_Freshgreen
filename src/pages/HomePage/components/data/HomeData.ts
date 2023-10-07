import {
  FeaturedCategoryDataType,
  HomeAdsDataType,
} from "../../../../types/homeType";
import { HomeAds1, HomeAds2, HomeAds3 } from "../../../../constants/images";

export const FeaturedCategoryData: FeaturedCategoryDataType[] = [
  {
    image:
      "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1142&q=80",
    title: "Rau",
    count: 10,
    color: "green",
  },
  {
    image:
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    title: "Hải sản",
    count: 5,
    color: "blue",
  },
  {
    image:
      "https://images.unsplash.com/photo-1592686092916-672fa9e86866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Thịt",
    count: 3,
    color: "red",
  },
  {
    image:
      "https://images.unsplash.com/photo-1623452768745-de5f0d565c12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1113&q=80",
    title: "Trái cây",
    count: 8,
    color: "orange",
  },
  {
    image:
      "https://images.unsplash.com/photo-1612927601601-6638404737ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    title: "Mì gói",
    count: 6,
    color: "yellow",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501959915551-4e8d30928317?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    title: "Đồ chay",
    count: 4,
    color: "brown",
  },
  {
    image:
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80",
    title: "Đồ uống",
    count: 7,
    color: "purple",
  },
  {
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
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
