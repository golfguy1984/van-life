import React, { useEffect, useState } from "react";
import {
  useParams,
  Link,
  useLocation,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import PaymentModal from "../PaymentModal";
import DatePicker from "react-datepicker";
import { FadeLoader } from "react-spinners";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";

import "react-datepicker/dist/react-datepicker.css";

// discount needs to show if rental is more 3 days or more
//url params = start="startDate" End="endDate" pickupTime=StartTime dropoffTime=endtime

function VansDetail() {
  const initialTime = new Date();
  initialTime.setHours(10);
  initialTime.setMinutes(30);

  const [van, setVan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(initialTime);
  const [endTime, setEndTime] = useState(initialTime);
  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today;
  });
  const [discount, setDiscount] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [userState, setUserState] = useState(null);

  const { id } = useParams();
  const location = useLocation();
  const contextVans = useOutletContext().allVans;
  const navigate = useNavigate();

  const durationInMs = endDate - startDate;
  const durationInDays = Math.ceil(durationInMs / (1000 * 60 * 60 * 24));

  console.log(durationInDays);

  useEffect(() => {
    if (durationInDays >= 3) {
      setDiscount(true);
    } else {
      setDiscount(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (contextVans) {
      const contextVan = contextVans.filter((item) => item.id === id)[0];
      setVan(contextVan);
      // setLoading(false);
    }
  }, [contextVans]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await axios.post(
              "http://localhost:8000/get-state",
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }
            );
            setUserState(response.data.state);
          } catch (error) {
            console.error("Error getting state:", error.message);
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);

  const search = location.state?.search || "";

  const handleRentClick = async () => {
    setIsLoading(true);

    const response = await fetch("http://localhost:8000/api/checkout");

    if (!response.ok) {
      throw new Error(`failed to fetch ${response.status}`);
    }

    const data = await response.json();
    const { token } = data;

    localStorage.setItem("token", token);

    setTimeout(() => {
      navigate(
        `/vans/${id}/checkout?duration=${durationInDays}&start=${startDate}&end=${endDate}&token=${token}`
      );
    }, 2500);
  };

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <FadeLoader color="white" />
        </div>
      )}
      {openModal && <PaymentModal />}
      <Link to={`..?${search}`} relative="path" className="back-button">
        &larr; back to vans
      </Link>
      {van && (
        <div className="van-detailed-wrapper">
          <div className="image-container">
            <img src={van.imageUrl} />
          </div>
          <div className={`van-type ${van.type} selected`}>{van.type}</div>
          <h1>{van.name}</h1>
          <p>
            <span>${van.price}</span>/day
          </p>
          <div className="date-picker-wrapper">
            <h4>Trip Start</h4>
            <div className="date-time-wrapper">
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);

                  // Create a new Date object based on the startDate
                  const newEndDate = new Date(date);

                  // Update the newEndDate to be two days after the startDate
                  newEndDate.setDate(newEndDate.getDate() + 2);

                  // Set the endDate state with the new value
                  setEndDate(newEndDate);
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                wrapperClassName="date-picker-main"
              />
              <DatePicker
                className="start-time"
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                wrapperClassName="time-picker-main"
              />
            </div>
            <h4>Trip End</h4>
            <div className="date-time-wrapper">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                wrapperClassName="date-picker-main"
              />
              <DatePicker
                className="end-time"
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                wrapperClassName="time-picker-main"
              />
            </div>
            {discount && (
              <div className="discount">
                <p>3 day discount</p>
                <p>${van.price * 0.1}</p>
              </div>
            )}
          </div>
          <div className="pickup-return-wrapper">
            <h4>Pickup & Return</h4>
            <div className="pickup-return-inner">
              <FaMapMarkerAlt />
              <p style={{ fontWeight: "bold", marginLeft: ".5rem" }}>
                {userState}
              </p>
              <h4 style={{ marginLeft: "auto" }}>change</h4>
            </div>
          </div>
          <p>{van.description}</p>
          <div className="rent-button-wrapper">
            <div className="total-price">
              <p style={{ fontWeight: "bold" }}>
                {!discount ? (
                  <span>${van.price}/day</span>
                ) : (
                  <s style={{ color: "#b5b5b5" }}>
                    <span>${van.price}</span>/day
                  </s>
                )}
                {discount && <span> ${van.price - van.price * 0.1}/day</span>}
              </p>
              {!discount ? (
                <p style={{ fontSize: ".85rem" }}>
                  ${`${van.price * durationInDays} excl. taxes & fees`}
                </p>
              ) : (
                <p style={{ fontSize: ".85rem" }}>
                  $
                  {`${
                    (van.price - van.price * 0.1) * durationInDays
                  } excl. taxes & fees`}
                </p>
              )}
            </div>
            {/* <Link to={`/vans/${id}/checkout`}> */}
            <button onClick={handleRentClick}>Rent this van</button>
            {/* </Link> */}
          </div>
        </div>
      )}
    </>
  );
}

export default VansDetail;
