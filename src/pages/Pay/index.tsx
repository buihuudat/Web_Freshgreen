import { useEffect } from "react";
import Box from "@mui/material/Box";
import { payActions } from "../../actions/payActions";
import { useLocation } from "react-router-dom";
import { Container, Paper } from "@mui/material";
import BillPay from "./components/BillPay";
import FormPayment from "./components/FormPayment";
import { useAppDispatch } from "../../redux/hooks";
import { PayDataProps } from "../../types/payType";

export default function Payment() {
  const { state } = useLocation();
  const payData: PayDataProps = state.payData;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(payActions.payment(state.payData.amount));
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "10%",
      }}
    >
      <Box width={"50%"}>
        <Paper elevation={9} sx={{ p: 3, mt: 5 }}>
          <FormPayment {...payData} />
        </Paper>
      </Box>
      <Box width={"50%"}>
        <BillPay {...payData} />
      </Box>
    </Container>
  );
}
