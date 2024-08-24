import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createevent.css";

const AddEvent = ({ setEvents }) => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    event_date: "",
    venue: "",
    description: "",
    image_path: "",
  });

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewEvent((prevEvent) => ({ ...prevEvent, image_path: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddEvent = () => {
    setEvents((prevEvents) => [
      ...prevEvents,
      { ...newEvent, event_id: prevEvents.length + 1 },
    ]);
    history.push("/");
  };

  return (
    <div className="add-event-container">
      <h2>Add Event</h2>
      <input
        type="text"
        name="title"
        value={newEvent.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        type="date"
        name="event_date"
        value={newEvent.event_date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="venue"
        value={newEvent.venue}
        onChange={handleChange}
        placeholder="Venue"
      />
      <textarea
        name="description"
        value={newEvent.description}
        onChange={handleChange}
        placeholder="Description"
      ></textarea>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleAddEvent}>Add Event</button>
    </div>
  );
};

export default AddEvent;
