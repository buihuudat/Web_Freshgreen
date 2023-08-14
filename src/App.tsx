import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import { lazy } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { ToastContainer } from "react-toastify";
import Products from "./pages/Products";
import AuthLayout from "./components/layouts/AuthLayout";
import UserLayout from "./components/layouts/UserLayout";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Payment from "./pages/Pay";
import OrderManager from "./pages/OrderManeger";
import Thankyou from "./pages/Pay/Thankyou";

const HomePage = lazy(() => import("./pages/HomePage"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Store = lazy(() => import("./pages/Store"));
const StoreDetails = lazy(
  () => import("./pages/Store/components/StoreDetails")
);
const News = lazy(() => import("./pages/News"));
const NewsLists = lazy(() => import("./pages/News/Lists"));
const NewsDetails = lazy(() => import("./pages/News/NewsDetails"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const Compage = lazy(() => import("./pages/Compage"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Cart = lazy(() => import("./pages/Cart"));
const ProductDetails = lazy(
  () => import("./pages/Products/components/ProductDetails")
);

const App = () => {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/dang-ky" element={<Register />} />
          <Route path="/dang-nhap" element={<Login />} />
        </Route>

        <Route path="/" element={<AppLayout />}>
          <Route path="/" index element={<HomePage />} />
          <Route path="/san-pham" element={<Products />} />
          <Route
            path="/san-pham/details/:params"
            element={<ProductDetails />}
          />
          <Route path="/cua-hang" element={<Store />} />
          <Route path="/cua-hang/:params" element={<StoreDetails />} />
          <Route path="/tin-tuc" element={<News />}>
            <Route path="" element={<NewsLists />} />
            <Route path=":params" element={<NewsDetails />} />
          </Route>
          <Route path="/faq" element={<FAQ />} />
          <Route path="/lien-he" element={<Contact />} />
          <Route path="/so-sanh" element={<Compage />} />
        </Route>

        <Route path="/" element={<UserLayout />}>
          <Route path="/gio-hang" element={<Cart />} />
          <Route path="/san-pham-yeu-thich" element={<Favorites />} />
          <Route path="/tai-khoan" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/quan-li-don-hang" element={<OrderManager />} />
          <Route path="/thankyou" element={<Thankyou />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
