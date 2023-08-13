import { ProductCartType } from "./cartType";

export enum StatusOrder {
  spending,
  success,
  cancel,
  refuse,
  default,
}

interface VoucherUsedType {
  voucher: string;
  discount: number;
}

export enum PayMethod {
  payNow = "payNow",
  lastPay = "lastPay",
}

export enum PayStatus {
  spending = "spending",
  falure = "falure",
  success = "success",
}
export interface PayType {
  method: PayMethod;
  amount: number;
  status: PayStatus;
}

export enum OrderStatus {
  spending = "spending",
  success = "success",
  cancel = "cancel",
  refuse = "refuse",
}
export interface OrderItemType {
  _id?: string;
  products: ProductCartType[];
  totalPrice: number;
  voucherUsed: VoucherUsedType;
  status: OrderStatus;
  message?: string;
  pay: PayType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderType {
  _id?: string;
  user: string;
  orders: OrderItemType[];
}

export const initialDataOrder = {
  user: "",
  orders: [],
};
