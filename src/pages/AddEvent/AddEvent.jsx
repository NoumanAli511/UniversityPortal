// src/AddEvent.js
import React, { useState } from "react";
import "./addevent.css";

const AddEvent = ({ onNavigateBack }) => {
  const [newEvent, setNewEvent] = useState({
    event_id: "",
    title: "",
    event_date: "",
    venue: "",
    description: "",
    image_path: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      image_path: URL.createObjectURL(file),
    }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming event submission is successful, navigate back to the previous page
    onNavigateBack();
  };

  return (
    <div className="events-container">
      <h1>{newEvent.event_id ? "Edit Event" : "Add Event"}</h1>
      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="event_date"
          value={newEvent.event_date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={newEvent.venue}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newEvent.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="image-preview" />
        )}
        <button type="submit">
          {newEvent.event_id ? "Update Event" : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
