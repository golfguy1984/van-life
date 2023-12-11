import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";

function HostVans() {
  const { vans } = useOutletContext();

  let vansEl = vans.map((van) => (
    <Link key={van.id} to={van.id}>
      <div className="host-vans-wrapper">
        <div className="host-vans-img-container">
          <img src={van.imageUrl} />
        </div>
        <div>
          <h1>{van.name}</h1>
          <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <div className="host-vans-main-container">
      <div className="host-vans-top">
        <h1>Your listed vans</h1>
        <Link to="./add">
          <p>
            <span>
              <CiCirclePlus />
            </span>
            Add van
          </p>
        </Link>
      </div>

      {vansEl}
    </div>
  );
}

export default HostVans;
