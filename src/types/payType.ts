export interface PayDataProps {
  amount: number;
  totalPrice: number;
  address: string;
  phone: string;
  email: string;
  nameOfUser: string;
  discount?: {
    voucher: string;
    discount: number;
  };
}

export const InitialPayData: PayDataProps = {
  amount: 0,
  totalPrice: 0,
  address: "",
  phone: "",
  email: "",
  nameOfUser: "",
};

export interface PayMethodOptionItem {
  name: String;
  path: String;
  image: String;
  value: String;
}

export interface VNPayMethod {
  amount: number;
  bankCode: String;
}
