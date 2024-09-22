import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MdEdit, MdDelete, MdComment } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import "./eventsfirstscreen.css";

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
  const [comments, setComments] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [viewedCount, setViewCount] = useState(0);

  const fetchAllViews = async (eventID) => {
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/student/fetchAllViewedEvent?eventId=${eventID}`
      );
      const result = await response.json();
      if (result) {
        setViewCount(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost/studentminiportal/api/event/GetEvents"
      );
      const result = await response.json();
      if (result) {
        setEvents(result);
      } else {
        console.log("No events found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, [events]);

  const fetchComments = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/student/FetchingAllCommits?eventid=${eventId}`
      );
      const result = await response.json();
      if (result) {
        setComments(result);
        setSelectedEventId(eventId);
      } else {
        console.log("No comments found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentButtonClick = async (eventId) => {
    await fetchComments(eventId);
    setShowCommentsModal(true);
  };

  const handleCloseCommentsModal = () => {
    setShowCommentsModal(false);
    setComments([]);
  };

  const handleImagePress = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/event/DeleteEvent?event_id=${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result === "Event Deleted") {
        alert("Event Deleted");
        const updatedEvents = events.filter((event) => event.id !== id);
        setEvents(updatedEvents);
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
      id: events.length + 1,
      title: newEventTitle,
      event_date: newEventDate, // Already in yyyy-MM-dd format
      venue: newEventVenue,
      description: newEventDescription,
      image: newEventImage,
    };
    setEvents([...events, newEvent]);
    await saveEventData(newEvent);

    setNewEventTitle("");
    setNewEventDate(getTodayDate()); // Reset to today's date
    setNewEventVenue("");
    setNewEventDescription("");
    setNewEventImage(null);
  };

  const renderEventItem = (item, index) => {
    return (
      <div
        className="eventItem"
        key={index}
        onClick={() => handleImagePress(item.image_path)}
        onMouseEnter={() => fetchAllViews(item.event_id)}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            gap: "8px",
          }}
        >
          <MdEdit
            onClick={(e) => {
              e.stopPropagation();
              navigate("/EventEdit", { state: { event: item } });
            }}
            size={24}
            color="green"
          />

          <MdDelete
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteEvent(item.event_id);
            }}
            size={24}
            color="red"
          />
          <MdComment
            onClick={(e) => {
              e.stopPropagation();
              handleCommentButtonClick(item.event_id);
            }}
            size={24}
            color="gray"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FaEye />
            {viewedCount.length}
          </div>
        </div>
      </div>
    );
  };

  const handleEventAdding = () => {
    setAddEvent((curr) => !curr);
  };

  return (
    <div className="container">
      <div className="header">
        <Link to="/AdminDashboard">
          <div
            className="Admindashboardback__btn"
            style={{ marginTop: "20px" }}
          >
            <ArrowBackIcon style={{ fontSize: 40 }} />
          </div>
        </Link>
        <h2 className="headerText">Posted Events</h2>
      </div>
      <div className="eventList">
        <button className="addEventButton" onClick={handleEventAdding}>
          Add New Event
        </button>
        {events.map((item, index) => renderEventItem(item, index))}
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
            min={getTodayDate()}
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
      {showCommentsModal && (
        <CommentsModal comments={comments} onClose={handleCloseCommentsModal} />
      )}
    </div>
  );
};

const CommentsModal = ({ comments, onClose }) => {
  return (
    <div className="modal">
      <div className="modalContent">
        <h2>Comments</h2>
        <button className="closeButton" onClick={onClose}>
          Close
        </button>
        <table className="commentsTable">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.student_id}</td>
                <td>{comment.arid_number}</td>
                <td>{comment.commentText}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Event;
