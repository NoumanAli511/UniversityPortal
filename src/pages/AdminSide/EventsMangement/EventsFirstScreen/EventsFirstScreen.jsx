import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./eventsfirstscreen.css";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";

const Event = () => {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [events, setEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState(getTodayDate());
  const [AddEvent, setAddEvent] = useState(false);
  const [newEventVenue, setNewEventVenue] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventImage, setNewEventImage] = useState(null);

  const fetchAllEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost/studentminiportal/api/event/GetEvents"
      );
      const result = await response.json();
      if (result) {
        setEvents(result);
      } else {
        console.log("not founded");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, [events]);

  const handleImagePress = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleDeleteEvent = async (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/event/DeleteEvent?event_id=${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result === "Event Deleted") {
        alert("Deleted");
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveEventData = async (eventData) => {
    try {
      const formData = new FormData();
      console.log(eventData);
      Object.entries(eventData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((element) => formData.append(key, element));
        } else {
          formData.append(key, value);
        }
      });

      const response = await axios.post(
        "http://localhost/studentminiportal/api/Event/CreateEvent",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: error.response?.data,
        status: error.response?.status,
      };
    }
  };

  const handleAddEvent = async () => {
    const newEvent = {
      id: events?.length + 1,
      title: newEventTitle,
      event_date: newEventDate, // Already in yyyy-MM-dd format
      venue: newEventVenue,
      description: newEventDescription,
      image: newEventImage,
    };
    setEvents([...events, newEvent]);
    const result = await saveEventData(newEvent);

    setNewEventTitle("");
    setNewEventDate(getTodayDate()); // Reset to today's date
    setNewEventVenue("");
    setNewEventDescription("");
    setNewEventImage(null);
  };

  const renderEventItem = (item, index) => (
    <div
      className="eventItem"
      key={index}
      onClick={() => handleImagePress(item.image_path)}
    >
      <img
        src={`http://localhost/studentminiportal/Images/${item.image_path}`}
        alt="Event"
        className="eventImage"
      />
      <div className="eventDetails">
        <h3 className="eventTitle">{item.title}</h3>
        <p className="eventDate">
          {item.event_date && item.event_date.split("T")[0]}
        </p>
        <p className="eventVenue">{item.venue}</p>
        <p className="eventDescription">{item.description}</p>
      </div>
      <button
        className="editButton"
        onClick={(e) => {
          e.stopPropagation();
          navigate("/EventEdit", { state: { event: item } });
        }}
      >
        <MdEdit size={24} color="#0088B4" />
      </button>
      <button
        className="deleteButton"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteEvent(item.event_id);
        }}
      >
        <MdDelete size={24} color="white" />
      </button>
    </div>
  );

  const handleEventAdding = () => {
    setAddEvent((curr) => !curr);
  };

  return (
    <div className="container">
      <div className="header">
        <h2 className="headerText">Posted Events</h2>
      </div>
      <div className="eventList">
        <button className="addEventButton" onClick={handleEventAdding}>
          Add New Event
        </button>
        {events?.map((item, index) => renderEventItem(item, index))}
      </div>
      {AddEvent && (
        <div className="addEventForm">
          <input
            type="text"
            placeholder="Event Title"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            className="input"
          />
          <input
            type="date"
            value={newEventDate}
            onChange={(e) => setNewEventDate(e.target.value)}
            className="input"
            min={getTodayDate()} // Ensure the date is in yyyy-MM-dd format
          />
          <input
            type="text"
            placeholder="Venue"
            value={newEventVenue}
            onChange={(e) => setNewEventVenue(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Description"
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
            className="input description"
          />
          <input
            type="file"
            onChange={(e) => setNewEventImage(e.target.files[0])}
            className="input"
          />
          <button className="addButton" onClick={handleAddEvent}>
            Add Event
          </button>
        </div>
      )}
    </div>
  );
};

export default Event;
