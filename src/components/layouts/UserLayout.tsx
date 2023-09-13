import { Box, LinearProgress } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Directory from "../common/Directory";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../common/Footer";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUserReducer } from "../../redux/slices/userSlice";
import { getItem } from "../../utils/handlers/tokenHandler";
import { cartActions } from "../../actions/cartActions";
import { favoriteActions } from "../../actions/favoriteActions";
import { orderActions } from "../../actions/orderActions";

const UserLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAUth = async () => {
      try {
        if (getItem("user")) {
          const user = await verifyToken();
          if (user) {
            setIsLoading(false);
            dispatch(setUserReducer(user));
            dispatch(cartActions.getCart(user._id));
            dispatch(orderActions.getOrders(user._id));
            dispatch(favoriteActions.get(user._id));
          } else {
            navigate("/dang-nhap");
          }
        } else {
          navigate("/dang-nhap");
        }
      } catch (error) {
        navigate("/dang-nhap");
      }
    };
    checkAUth();
  }, [navigate, dispatch]);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Suspense fallback={<LinearProgress color="success" />}>
      <Box px={{ xs: 2, sm: 10 }}>
        <Navbar />
        <Box minHeight={"100vh"} pt={15}>
          {pathname !== "/" && <Directory />}
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Suspense>
  );
};

export default UserLayout;
