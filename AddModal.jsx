import React, { useEffect, useRef, useState } from "react";
import { GoTrash } from "react-icons/go";
import { uploadImageAndStoreUrl, addVan } from "./api";
import { FadeLoader } from "react-spinners";
import { MdOutlineFileUpload } from "react-icons/md";
import { IconContext } from "react-icons";

function AddModal({ currentVan, handleClick, openModal, vanId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    type: "",
    imageUrl: "../assets/images/img-placeholder.svg",
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
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAdd = async (data) => {
    setIsLoading(true);
    await addVan(data);
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
          <img src={formData.imageUrl} />
          <input
            type="file"
            id="fileInput"
            className="file-input"
            onChange={async (e) => {
              setIsUpdated(true);
              const file = e.target.files[0];
              if (file) {
                const downloadURL = await uploadImageAndStoreUrl(file);
                setFormData((prevValues) => ({
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
          value={formData.name}
          onChange={handleChange}
        />
        <div className="price-cat-label-wrapper">
          <label htmlFor="price" className="price-label">
            PRICE:
          </label>
          <label htmlFor="cat-select">CATAGORY:</label>
        </div>
        <div className="price-cat-wrapper">
          <input
            id="price"
            className="price"
            name="price"
            type="text"
            value={formData.price}
            onChange={handleChange}
          />

          <select
            id="cat-select"
            className="cat-select"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option>--select--</option>
            <option value="rugged">Rugged</option>
            <option value={"simple"}>Simple</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>

        <label htmlFor="description">DESCRIPTION:</label>
        <textarea
          ref={textareaRef}
          id="description"
          name="description"
          type="text"
          value={formData.description}
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
            onClick={() => handleAdd(formData)}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default AddModal;
