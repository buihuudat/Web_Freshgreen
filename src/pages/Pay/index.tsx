import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { payActions } from "../../actions/payActions";
import { useLocation } from "react-router-dom";
import { Container, Paper } from "@mui/material";
import BillPay from "./components/BillPay";
import FormPayment from "./components/FormPayment";
import { PayDataProps } from "../../types/payType";
import { setItem } from "../../utils/handlers/tokenHandler";

export default function Payment() {
  const { state } = useLocation();
  const payData: PayDataProps = state.payData;
  const [secretClient, setSecretClient] = useState<{
    id: string;
    client_secret: string;
  }>({ id: "", client_secret: "" });

  useEffect(() => {
    const secretClient = async () => {
      try {
        const data = await payActions.payment(state.payData.amount);
        setItem("client_secret", data.client_secret);
        setSecretClient(data);
      } catch (error) {
        return false;
      }
    };
    secretClient();
  }, [state.payData.amount]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { sm: "row", xs: "column-reverse" },
        justifyContent: "center",
        gap: "10%",
      }}
    >
      <Box width={{ sm: "50%", xs: "100%" }}>
        <Paper elevation={9} sx={{ p: 3, mt: 5 }}>
          <FormPayment state={state} secretClient={secretClient} />
        </Paper>
      </Box>
      <Box width={{ sm: "50%", xs: "100%" }}>
        <BillPay {...payData} />
      </Box>
    </Container>
  );
}
