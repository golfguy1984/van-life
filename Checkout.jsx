import React, { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  useParams,
  useOutletContext,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { FaRegThumbsUp, FaStar } from "react-icons/fa";
import { MdDoubleArrow } from "react-icons/md";
import { MdOutlineShareLocation } from "react-icons/md";
import { IconContext } from "react-icons";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51ON3wUKknoF4bIMWTwwtnQvzFDoieGqVsy7GXJa8kIDPjspusQmx33K9dkmCYdjzmiemJu527kyOW4b2u0wAs0rE00lTQl0Ctn"
);

export default function PaymentModal() {
  const [clientSecret, setClientSecret] = useState(null);
  const [van, setVan] = useState(null);
  const [open, setOpen] = useState(false);
  const [tokenValid, setTokenValid] = useState(localStorage.getItem("token"));

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const start = new Date(queryParams.get("start"));
  const startMonth = start.toLocaleString("en-US", { month: "short" });
  const startWeekday = start.toLocaleString("en-US", { weekday: "short" });
  const end = new Date(queryParams.get("end"));
  const endMonth = end.toLocaleString("en-US", { month: "short" });
  const endWeekday = end.toLocaleString("en-US", { weekday: "short" });
  const token = queryParams.get("token");
  const duration = queryParams.get("duration");
  const paymentRef = useRef(null);

  const { id } = useParams();
  const { allVans } = useOutletContext();

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  let discount = 1;

  if (duration >= 3) {
    discount = 0.9;
  }

  useEffect(() => {
    const checkAndRedirect = async () => {
      try {
        const response = await fetch(
          `https://localhost:8000/api/checkToken?token=${token}`
        );

        if (!response.ok) {
          throw new Error(`Failed to check token validity: ${response.status}`);
        }

        const data = await response.json();

        const isValid = !data.tokenUsed;

        if (!isValid || tokenValid === null) {
          window.scrollTo(0, 0);
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking token validity:", error);
      }
    };

    checkAndRedirect();
  }, [token, navigate]);

  useEffect(() => {
    if (allVans) {
      const contextVan = allVans.filter((item) => item.id === id)[0];
      setVan(contextVan);
    }
  }, [allVans]);

  useEffect(() => {
    if (duration === undefined || van?.price === undefined) {
      // If not defined, return and wait for the next render
      return;
    }

    const fetchClientSecret = async () => {
      try {
        const response = await fetch("https://localhost:8000/pay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: van?.price,
            numDays: duration,
            van: van,
          }),
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
  }, [van, duration]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  useEffect(() => {
    if (paymentRef.current) {
      setTimeout(() => {
        paymentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 1500);
    }
  }, [open]);

  return (
    <div className="checkout-wrapper">
      <div className="checkout-review-container">
        <div className="checkout-image-container">
          <img src={van?.imageUrl} />
        </div>
        <div>
          <h3>{van?.name}</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconContext.Provider value={{ color: "#FF8C38" }}>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </IconContext.Provider>
            <span style={{ marginLeft: ".5rem" }}>- 14 trips</span>
          </div>
        </div>
      </div>
      <div className="checkout-dates-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h4 style={{ margin: "0" }}>
            {startWeekday}, {startMonth}. {start.getDay()}
          </h4>
          <p style={{ margin: "0" }}>10:30AM</p>
        </div>
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <MdDoubleArrow />
        </IconContext.Provider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h4 style={{ margin: "0" }}>
            {endWeekday}, {endMonth}. {end.getDay()}
          </h4>
          <p style={{ margin: "0" }}>2:30PM</p>
        </div>
      </div>
      <div className="checkout-location-container">
        <div>
          <h4>Atlanta, Georgia</h4>
          <h5>Heartsfield Jackson International Airport</h5>
          <p>
            You'll pickup and dropoff your van at the #vanlife valet lot near
            Heartsfield Jackson International Airport. complementary
            transportation to and from lot
          </p>
        </div>
        <IconContext.Provider value={{ size: "5rem" }}>
          <MdOutlineShareLocation />
        </IconContext.Provider>
      </div>
      <div className="grid-container">
        <div className="item">
          <p>Trip Price</p>
          <p style={{ fontSize: ".75rem" }}>3-day discount</p>
        </div>
        <div className="price-checkout">
          <p>US$ {Number(van?.price * discount).toFixed(2)}/day</p>
          <p style={{ fontSize: ".75rem" }}>
            <s>US${van?.price}/day</s>
          </p>
        </div>
        <div className="item">Trip Fee</div>
        <div className="price-checkout">$3.75/day</div>
        <div className="item">Total per day</div>
        <div className="price-checkout">
          ${Number(van?.price * discount + 3.75).toFixed(2)}/day
        </div>
      </div>
      <div className="total-grid-container">
        <div className="item">
          <p>{duration}-day trip</p>
        </div>
        <div className="price-checkout">
          <p>
            US$ {Number((van?.price * discount + 3.75) * duration).toFixed(2)}
            /day
          </p>
        </div>
        <div className="item">Delivery Fee</div>
        <div className="price-checkout">Free</div>
        <div className="item">1000 total miles</div>
        <div className="price-checkout">Free</div>
        <div className="item">Trip total</div>
        <div className="price-checkout">
          US${" "}
          {Number((van?.price * discount + 3.75) * duration * 1.07).toFixed(2)}
        </div>
      </div>
      <div className="cancellation-container">
        <FaRegThumbsUp />
        <div>
          <h3>Free Cancellation</h3>
          <p>Full refund before date in local time of the van.</p>
        </div>
      </div>
      <div className="payment-info-container" ref={paymentRef}>
        <div className="payment-info-dropdown">
          <h3>Payment info</h3>
          <div
            className="arrow-container"
            onClick={() => {
              setOpen((prev) => !prev);
              // scrollToCenter();
            }}
          >
            <p>add</p>
            {open && <MdKeyboardArrowDown />}
            {!open && <MdKeyboardArrowRight />}
          </div>
        </div>

        {open && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm token={token} ref={paymentRef} vanID={id} />
          </Elements>
        )}
      </div>
    </div>
  );
}
