import React, { useEffect, useRef, useState } from "react";
import { GoTrash } from "react-icons/go";
import { updateVan, uploadImageAndStoreUrl } from "./api";
import { FadeLoader } from "react-spinners";
import { MdOutlineFileUpload } from "react-icons/md";
import { IconContext } from "react-icons";

function Test({ currentVan, handleClick, openModal, vanId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [value, setValue] = useState({
    name: currentVan?.name || "",
    price: currentVan?.price || "",
    description: currentVan?.description || "",
    imageUrl: currentVan?.imageUrl || "",
  });

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currentVan]);

  const handleChange = (e) => {
    setIsUpdated(true);
    const { name, value } = e.target;
    setValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = (vanId, value) => {
    setIsLoading(true);
    updateVan(vanId, value);
    setTimeout(handleClick, 1000);
  };

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <FadeLoader color="white" />
        </div>
      )}
      <div className="modal-wrapper">
        <GoTrash onClick={openModal} className="trash-can" />
        <div className="img-upload">
          <img src={value.imageUrl} />
          <input
            type="file"
            id="fileInput"
            className="file-input"
            onChange={async (e) => {
              setIsUpdated(true);
              const file = e.target.files[0];
              if (file) {
                const downloadURL = await uploadImageAndStoreUrl(file);
                setValue((prevValues) => ({
                  ...prevValues,
                  imageUrl: downloadURL,
                }));
              }
            }}
          />
          <label htmlFor="fileInput" className="file-input-label">
            <div className="custom-button">
              <IconContext.Provider value={{ size: "1.25rem" }}>
                <MdOutlineFileUpload />
              </IconContext.Provider>
            </div>
          </label>
        </div>
        <label htmlFor="name">NAME:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={value.name}
          onChange={handleChange}
        />

        <label htmlFor="price">PRICE:</label>
        <input
          id="price"
          name="price"
          type="text"
          value={value.price}
          onChange={handleChange}
        />

        <label htmlFor="description">DESCRIPTION:</label>
        <textarea
          ref={textareaRef}
          id="description"
          name="description"
          type="text"
          value={value.description}
          onChange={handleChange}
        ></textarea>
        <div className="modal-button-wrapper">
          <button className="black" onClick={handleClick}>
            close
          </button>
          <button
            className="orange"
            disabled={!isUpdated}
            style={{ backgroundColor: !isUpdated ? "#ffc498" : "FF8C38" }}
            onClick={() => {
              handleSave(vanId, value);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default Test;
