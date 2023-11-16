import { LinearProgress, Box } from "@mui/material";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import Directory from "../common/Directory";
import Footer from "../common/Footer";
import ScrollTop from "../common/ScrollTop";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserReducer } from "../../redux/slices/userSlice";
import { clearStorage, getItem } from "../../utils/handlers/tokenHandler";
import { cartActions } from "../../actions/cartActions";
import { favoriteActions } from "../../actions/favoriteActions";
import PopupMessage from "../PopupMessage";
import { socket } from "../../utils/api/socketConfirm";
import {
  onListentingMessage,
  requestPermissionNotification,
} from "../../utils/handlers/getFCMToken";
import { RootState } from "../../redux/store";
import { setPopup } from "../../redux/slices/messageSlice";

const AppLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const popup = useAppSelector((state: RootState) => state.messages.popup);

  user && onListentingMessage(dispatch, user._id!);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!getItem("user")) {
          return clearStorage();
        }
        const user = await verifyToken();
        if (!user) {
          return clearStorage();
        }

        dispatch(setUserReducer(user));
        dispatch(cartActions.getCart(user._id));
        dispatch(favoriteActions.get(user._id));
        requestPermissionNotification(user._id!);
        socket.emit("user-connect", user._id);
      } catch (error) {
        return;
      }
    };
    checkAuth();
  }, [dispatch]);

  socket.on("message-recieve", (data) => {
    dispatch(setPopup(!popup));
  });

  return (
    <Suspense fallback={<LinearProgress color="success" />}>
      <Box px={{ xs: 2, sm: 10 }}>
        <Navbar />
        <Box minHeight={"100vh"} pt={{ sm: 15, xs: 10 }}>
          {pathname !== "/" && <Directory />}
          <Outlet />
        </Box>
        <Footer />
        <ScrollTop />
        <PopupMessage />
      </Box>
    </Suspense>
  );
};

export default AppLayout;
