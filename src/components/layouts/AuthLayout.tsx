import { Box, LinearProgress } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import Directory from "../common/Directory";
import Footer from "../common/Footer";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { getItem } from "../../utils/handlers/tokenHandler";

const AuthLayout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (getItem("user")) {
          const user = await verifyToken();
          if (user) {
            navigate("/");
          } else {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [navigate, dispatch]);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Suspense fallback={<LinearProgress color="success" />}>
      <Box px={10}>
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

export default AuthLayout;
