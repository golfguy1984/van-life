import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { getHostIncome, getHostReviews, getLoggedInVans } from "../api";

function Host() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState([]);
  const [reviews, setReviews] = useState([]);

  const activeStyle = {
    textDecoration: "underline",
    color: "#161616",
    fontWeight: "700",
  };

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        await getLoggedInVans((updatedVans) => {
          setVans(updatedVans);
        });
        const incomeData = await getHostIncome();
        setIncome(incomeData);

        const reviewsData = await getHostReviews();
        setReviews(reviewsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadVans();

    // If you want to unsubscribe when the component unmounts
    return () => {
      if (getLoggedInVans.unsubscribe) {
        getLoggedInVans.unsubscribe();
      }
    };
  }, []);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <nav className="host-page-nav">
        <NavLink
          to="."
          end
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="income"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Income
        </NavLink>
        <NavLink
          to="vans"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Vans
        </NavLink>
        <NavLink
          to="reviews"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet context={{ vans, income, reviews }} />
    </>
  );
}

export default Host;
