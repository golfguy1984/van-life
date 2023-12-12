import React, { useEffect, useState } from "react";
import {
  Outlet,
  useParams,
  NavLink,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";
import { CiEdit } from "react-icons/ci";
import { IconContext } from "react-icons";

function HostVansDetail() {
  const [currentVan, setCurrentVan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { id } = useParams();
  const { vans } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    let filteredVan = vans.filter((van) => van.id === id);
    setCurrentVan(filteredVan[0]);
  }, [id, isOpen]);

  if (loading) {
    return <PacmanLoader />;
  }

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDelete = () => {
    setDeleteOpen((prev) => !prev);
  };

  return (
    <>
      <NavLink
        to=".."
        relative="path"
        className="back-button back-button-details"
      >
        &larr; back to all vans
      </NavLink>
      {isOpen && (
        <EditModal
          openModal={handleDelete}
          currentVan={currentVan}
          handleClick={handleClick}
          vanId={id}
        />
      )}
      {deleteOpen && (
        <DeleteModal closeModal={handleDelete} navigate={navigate} vanId={id} />
      )}
      <div className="host-van-detail-container">
        {currentVan && (
          <>
            <IconContext.Provider value={{ size: "1.5rem" }}>
              <CiEdit onClick={handleClick} className="edit-icon" />
            </IconContext.Provider>
            <div className="host-van-detail-top">
              <div className="img-upload">
                <img src={currentVan.imageUrl} />
              </div>
              <div className="host-van-detail-right">
                <div
                  className={`van-type ${currentVan.type} selected host-van-detail-badge`}
                >
                  {currentVan.type}
                </div>
                <h3>{currentVan.name}</h3>
                <p>
                  <span>${currentVan.price}</span>/day
                </p>
              </div>
            </div>
            <nav className="host-details-nav">
              <NavLink className="detail-btn" to=".">
                Details
              </NavLink>
              <NavLink to="pricing">Pricing</NavLink>
              <NavLink to="photos">Photos</NavLink>
            </nav>
            <Outlet context={{ currentVan }} />
          </>
        )}
      </div>
    </>
  );
}

export default HostVansDetail;
