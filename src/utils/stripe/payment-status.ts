import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";
const PaymentStatus = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const [message, setMessage] = useState<any | null>(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret: any = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: any) => {
        switch (paymentIntent.status) {
          case "succeeded":
            // clearCart();
            setMessage(
              `Thank you! your purchase for $${
                paymentIntent.amount / 100
              } has been accepted successfully.`
            );
            break;

          case "processing":
            setMessage(
              "Payment processing. We'll update you when payment is received."
            );
            break;

          case "requires_payment_method":
            navigate(-1);
            setMessage("Payment failed. Please try another payment method.");
            break;

          default:
            navigate(-1);
            setMessage("Something went wrong.");
            break;
        }
      });
  }, [stripe, navigate]);

  return message;
};

export default PaymentStatus;
