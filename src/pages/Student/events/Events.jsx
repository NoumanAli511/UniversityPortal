import React, { useEffect, useState } from "react";
import "./events.css";
import { FaBasketballBall } from "react-icons/fa";

const UpcomingEvents = () => {
  const [sportsEvents, setSportsEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost/studentminiportal/api/Event/GetEvents"
      ); // Update with your actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setSportsEvents(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="events">
          {sportsEvents.map((event, index) => (
            <div key={index} className="postContainer">
              <div className="userInfo">
                <FaBasketballBall
                  className="userAvatar"
                  size={24}
                  color="#000"
                />
                <span className="userName">{event.title}</span>
              </div>
              <img
                src={`http://localhost/studentminiportal/Images/${event.image_path}`}
                alt={event.title}
                className="eventImage"
              />

              <div className="postDetails">
                <p className="postDescription">{event.description}</p>
                <p className="postTimestamp">Date: {event.date}</p>
                <p className="postTimestamp">Venue: {event.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpcomingEvents;
