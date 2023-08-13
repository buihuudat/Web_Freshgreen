import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import authSlice from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";
import tagSlice from "./slices/tagSlice";
import newsSlice from "./slices/newsSlice";
import voucherSlice from "./slices/voucherSlice";
import productSlice from "./slices/productSlice";
import shopSlice from "./slices/shopSlice";
import cartSlice from "./slices/cartSlice";
import paySlice from "./slices/paySlice";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    category: categorySlice,
    tag: tagSlice,
    news: newsSlice,
    voucher: voucherSlice,
    product: productSlice,
    shop: shopSlice,
    cart: cartSlice,
    pay: paySlice,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
