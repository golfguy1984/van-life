import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import AddModal from "../AddModal";

function HostVans() {
  const [isOpen, setIsOpen] = useState(false);
  const { vans } = useOutletContext();

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

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
    <>
      {isOpen && <AddModal handleClick={handleClick} />}
      <div className="host-vans-main-container">
        <div className="host-vans-top">
          <h1>Your listed vans</h1>
          <div onClick={handleClick}>
            <p>
              <span>
                <CiCirclePlus />
              </span>
              Add van
            </p>
          </div>
        </div>

        {vansEl}
      </div>
    </>
  );
}

export default HostVans;
