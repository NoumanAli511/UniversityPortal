import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./eventFirstScreenedit.css";
import { FaPhotoVideo, FaSave } from "react-icons/fa";

const EditEvent = (props) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChoosePhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const source = URL.createObjectURL(file);
      setSelectedImage(source);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1 className="headerText">Edit Events</h1>
      </div>

      {/* Input fields */}
      <div className="inputContainer">
        <label className="label">Event Title</label>
        <input className="input" placeholder="Enter Event Title" />
      </div>

      <div className="inputContainer">
        <label className="label">Date</label>
        <input className="input" placeholder="Enter Date" />
      </div>

      <div className="inputContainer">
        <label className="label">Venue</label>
        <input className="input" placeholder="Enter Venue" />
      </div>

      {/* Image Picker */}
      <div className="imagePicker">
        <label htmlFor="fileInput">
          <FaPhotoVideo size={24} color="white" />
          <span className="buttonText">Choose Image</span>
        </label>
        <input
          id="fileInput"
          type="file"
          style={{ display: "none" }}
          onChange={handleChoosePhoto}
        />
      </div>
      {selectedImage && (
        <img src={selectedImage} alt="Selected" className="selectedImage" />
      )}

      {/* Save button */}
      <button onClick={() => navigate(-1)} className="saveButton">
        <FaSave size={24} color="white" />
        <span className="buttonText">Save</span>
      </button>
    </div>
  );
};

export default EditEvent;
