import { TagType } from "./tagType";

interface RatingsType {
  stars: number;
  count: number;
}
export interface ProductType {
  _id?: string;
  images: string[];
  title: string;
  description: string;
  price: number;
  lastPrice: number;
  discount: number;
  star: {
    count: number;
  };
  sold?: number;
  ratings: Array<RatingsType>;
  category: string;
  tags: Array<TagType>;
  status: boolean;
  quantity: number;
  currentQuantity: number;
  averageStarRating: number;
  brand: string;
  shop?: {
    _id: string;
    name: string;
    user: {
      avatar: string;
    };
  };
  comments: Array<string>;
  createdAt?: string;
  updatedAt?: string;
}

export const InitialProduct: ProductType = {
  images: [],
  title: "",
  description: "",
  price: 0,
  lastPrice: 0,
  discount: 0,
  star: {
    count: 0,
  },
  sold: 0,
  ratings: [],
  averageStarRating: 0,
  category: "",
  tags: [],
  status: false,
  quantity: 0,
  currentQuantity: 0,
  brand: "",
  comments: [],
};
