import React, { useState, useRef, useEffect, forwardRef } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Spinner from "react-bootstrap/Spinner";

// import "bootstrap/dist/css/bootstrap.min.css"; // this is causing the css issues

const CheckoutForm = forwardRef(({ token, vanID }, ref) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const styles = {
    backgroundColor: isLoading ? "#ffcba6" : "#FF8C38",
  };

  console.log(vanID);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `https://localhost:5173/confirmation/${token}?vanID=${vanID}`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} ref={ref} className="checkout-form">
      {stripe && <PaymentElement />}
      <button style={styles} disabled={isLoading || !stripe || !elements}>
        {isLoading ? (
          <div className="pay-spinner-div">
            {/* <Spinner animation="border" /> */}
            Loading...
          </div>
        ) : (
          "Submit"
        )}
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
});

export default CheckoutForm;
