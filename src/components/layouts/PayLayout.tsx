import { Box, Container, LinearProgress } from "@mui/material";
import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import BillPay from "../../pages/Pay/components/BillPay";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const PayLayout = () => {
  const { data } = useAppSelector((state: RootState) => state.pay.modal);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data.payData?.amount) return navigate("/gio-hang");
  }, [data, navigate]);

  return (
    <Box px={{ xs: 2, sm: 10 }}>
      <Box minHeight={"100vh"} pt={{ sm: 15, xs: 10 }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: { sm: "row", xs: "column-reverse" },
            justifyContent: "center",
            gap: "10%",
          }}
        >
          <Box width={{ sm: "50%", xs: "100%" }}>
            <BillPay {...data.payData} />
          </Box>
          <Box width={{ sm: "50%", xs: "100%" }}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default PayLayout;
