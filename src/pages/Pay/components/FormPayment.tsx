import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeError, loadStripe } from "@stripe/stripe-js";
import { useAppSelector } from "../../../redux/hooks";
import { LoadingButton } from "@mui/lab";
import { RootState } from "../../../redux/store";
import { LinearProgress } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { PayDataProps } from "../../../types/payType";
import { NotificationToast } from "../../../utils/handlers/NotificationToast";

const stripePromise = loadStripe(
  "pk_test_51NFrKrEup2wfutAaLVem6eRVtamjYxuUJwOy6F9ewZ7BtakNcARqqzcV9nZa6hbuQNj73JWxf1CywUOaaie5lbrO005zUQAI7K"
);

const FormPay = (props: PayDataProps) => {
  const [isProcessingPayment, setIsProcessingPayment] =
    useState<boolean>(false);

  const elements = useElements();
  const stripe = useStripe();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessingPayment(true);

    try {
      const { error }: { error: StripeError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/thankyou/",
          payment_method_data: {
            billing_details: {
              name: props.nameOfUser,
              phone: props.phone,
              email: props.email,
              address: {
                line1: props.address,
              },
            },
          },
        },
      });

      if (error) {
        console.log("Error during payment:", error.message);
      } else {
        NotificationToast({
          message: "Đã thanh toán thành công",
          type: "success",
        });
      }
    } catch (error) {
      return false;
    } finally {
      setIsProcessingPayment(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        size="large"
        disabled={!stripe}
        type="submit"
        loading={isProcessingPayment}
      >
        Thanh toán
      </LoadingButton>
    </form>
  );
};

const FormPayment = (props: PayDataProps) => {
  const { client_secret, loading } = useAppSelector(
    (state: RootState) => state.pay
  );

  const options = {
    clientSecret: client_secret,
  };

  return loading ? (
    <LinearProgress />
  ) : (
    <Elements stripe={stripePromise} options={options}>
      <FormPay {...props} />
    </Elements>
  );
};

export default FormPayment;
