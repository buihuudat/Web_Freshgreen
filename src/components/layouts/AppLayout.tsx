import { LinearProgress, Box } from "@mui/material";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import Directory from "../common/Directory";
import Footer from "../common/Footer";
import ScrollTop from "../common/ScrollTop";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUserReducer } from "../../redux/slices/userSlice";
import { getItem } from "../../utils/handlers/tokenHandler";
import { cartActions } from "../../actions/cartActions";
import { favoriteActions } from "../../actions/favoriteActions";
import { clearCart } from "../../redux/slices/cartSlice";

const AppLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!getItem("user")) {
          clearCart();
          return;
        }
        const user = await verifyToken();
        if (!user) {
          clearCart();
          return;
        }
        dispatch(setUserReducer(user));
        dispatch(cartActions.getCart(user._id));
        dispatch(favoriteActions.get(user._id));
      } catch (error) {
        return;
      }
    };
    checkAuth();
  }, [dispatch]);

  return (
    <Suspense fallback={<LinearProgress color="success" />}>
      <Box px={{ xs: 2, sm: 10 }}>
        <Navbar />
        <Box minHeight={"100vh"} pt={15}>
          {pathname !== "/" && <Directory />}
          <Outlet />
        </Box>
        <Footer />
        <ScrollTop />
      </Box>
    </Suspense>
  );
};

export default AppLayout;
