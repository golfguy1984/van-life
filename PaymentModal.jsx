import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

const stripePromise = loadStripe(
  "pk_test_51ON3wUKknoF4bIMWTwwtnQvzFDoieGqVsy7GXJa8kIDPjspusQmx33K9dkmCYdjzmiemJu527kyOW4b2u0wAs0rE00lTQl0Ctn"
);

export default function PaymentModal() {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("http://localhost:8000/pay", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { client_secret: fetchedClientSecret } = await response.json();
        setClientSecret(fetchedClientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        setClientSecret(null); // Reset clientSecret on error
      }
    };

    fetchClientSecret();
  }, []);
  console.log(clientSecret);

  // Ensure any dependencies are listed in the dependency array if needed

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="modal-wrapper">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
