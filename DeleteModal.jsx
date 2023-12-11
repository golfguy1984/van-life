import React from "react";
import { IoIosWarning } from "react-icons/io";
import { IconContext } from "react-icons";

function DeleteModal({ closeModal }) {
  return (
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
          <button className="red">Delete</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
