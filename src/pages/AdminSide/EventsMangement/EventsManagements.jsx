import React from "react";
import history from "../../../assets/history.png";
import "./eventsmanagement.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Link } from "react-router-dom";

const EventManagement = () => {
  return (
    <div className="maineventsmanage">
      <div className="contenteventsmanage">
        <div className="headercontent">
          <h2>EventManagement</h2>
        </div>
        <Link to={"/CreateEvents"}>
          <AddPhotoAlternateIcon
            style={{ fontSize: 150 }}
            className="historypic"
          />
          <div className="createevents">
            <h1>Create</h1>
          </div>
        </Link>
        <Link to={"/EventsFirstScreen"}>
          <div>
            <img src={history} alt="history" className="historypic" />
            <div className="createevents">
              <h1>History</h1>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EventManagement;
