import { payApi } from "../api/payApi";

export const paymentIntent = async <T>(cartTotal: number): Promise<T> => {
  const res = await payApi.payment(cartTotal);

  return res.data;
};
