export interface PayDataProps {
  amount: number;
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
  address: "",
  phone: "",
  email: "",
  nameOfUser: "",
};
