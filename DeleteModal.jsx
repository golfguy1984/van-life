import React, { useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { IconContext } from "react-icons";
import { FadeLoader } from "react-spinners";
import { deleteVan } from "./api";

function DeleteModal({ closeModal, navigate, vanId }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading((prev) => !prev);
    await deleteVan(vanId);
    setTimeout(() => navigate("/host/vans"), 3000);
  };
  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <FadeLoader color="white" />
        </div>
      )}
      <div className="delete-modal">
        <div>
          <IconContext.Provider value={{ size: "5rem", color: "#ED1C24" }}>
            <IoIosWarning />
          </IconContext.Provider>
          <h2>Are you sure?</h2>
          <p>
            This action can’t be undone, all values associated with this field
            will be lost.
          </p>
          <div className="delete-modal-btn-wrapper">
            <button onClick={handleDelete} className="red">
              Delete
            </button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
