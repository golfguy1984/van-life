import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useOutletContext,
  NavLink,
  Link,
} from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";

const stripePromise = loadStripe(
  "pk_test_51ON3wUKknoF4bIMWTwwtnQvzFDoieGqVsy7GXJa8kIDPjspusQmx33K9dkmCYdjzmiemJu527kyOW4b2u0wAs0rE00lTQl0Ctn"
);

const Confirmation = () => {
  const [van, setVan] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [pay, setPay] = useState(null);

  const { token } = useParams();
  const vanID = queryParams.get("vanID");
  const { allVans } = useOutletContext();

  // add token to usedTokens
  localStorage.removeItem("token");

  useEffect(() => {
    const rentedVan = allVans?.filter((van) => van.id === vanID);

    setVan(rentedVan);
  }, [vanID]);

  useEffect(() => {
    const markTokenAsUsed = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/markTokenUsed",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to mark token as used: ${response.status}`);
        }

        // Continue with the rest of your logic to retrieve and display payment information
        // ...
      } catch (error) {
        console.error("Error marking token as used:", error);
        // Handle the error as needed
      }
    };

    markTokenAsUsed();
  }, [token]);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const stripe = await stripePromise;

        const paymentIntentId = queryParams.get("payment_intent_client_secret");

        if (stripe && paymentIntentId) {
          const paymentIntent = await stripe.retrievePaymentIntent(
            paymentIntentId
          );

          setPay(paymentIntent);
        } else {
        }
      } catch (error) {
        console.error("Error retrieving Payment Intent:", error);
        // Handle the error as needed
      }
    };

    fetchPaymentIntent();
  }, []);

  return (
    <div className="confirm-main-container">
      <h3>Your van is booked!</h3>
      <p style={{ padding: "0 3rem", textAlign: "center" }}>
        You will recieve a confirmation email shortly with all of your trip
        details.
      </p>
      <p>order number: 832493849824</p>
      <IconContext.Provider value={{ color: "green", size: "3rem" }}>
        <BsFillCheckCircleFill />
      </IconContext.Provider>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Confirmation;
