import React, { useState } from "react";
import "./eventedit.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEvent = () => {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state;

  const [selectedImage, setSelectedImage] = useState(event.image_path);
  const [eventTitle, setEventTitle] = useState(event.title || "");
  const [eventDate, setEventDate] = useState(
    event.event_date ? event.event_date.split("T")[0] : ""
  );
  const [eventVenue, setEventVenue] = useState(event.venue || "");
  const [eventDescription, setEventDescription] = useState(
    event.description || ""
  );

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("event_id", event.event_id);
      formData.append("title", eventTitle);
      formData.append("event_date", eventDate);
      formData.append("venue", eventVenue);
      formData.append("description", eventDescription);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.post(
        "http://localhost/studentminiportal/api/event/UpdateTheEvent",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Event updated successfully!");
        navigate(-1); // Go back to the previous page
      } else {
        alert("Failed to update the event. Please try again.");
      }
    } catch (error) {
      console.error("Error updating the event:", error);
      alert("An error occurred while updating the event.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="headerText">Edit Event</h1>
      </div>

      <div className="inputContainer">
        <label className="label">Event Title</label>
        <input
          type="text"
          className="input"
          placeholder="Enter Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
      </div>

      <div className="inputContainer">
        <label className="label">Date</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="input"
          min={getTodayDate()}
        />
      </div>

      <div className="inputContainer">
        <label className="label">Venue</label>
        <input
          type="text"
          className="input"
          placeholder="Enter Venue"
          value={eventVenue}
          onChange={(e) => setEventVenue(e.target.value)}
        />
      </div>

      <div className="imagePickerContainer">
        <label className="label">Choose Image</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      {selectedImage && (
        <img
          src={`http://localhost/studentminiportal/Images/${selectedImage}`}
          className="selectedImage"
          alt="Selected Event"
        />
      )}

      <button onClick={handleSave} className="saveButton">
        <span className="buttonText">Save</span>
      </button>
    </div>
  );
};

export default EditEvent;
