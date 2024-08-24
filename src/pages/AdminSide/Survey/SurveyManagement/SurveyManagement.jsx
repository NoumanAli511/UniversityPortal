import React from "react";
import "./surveymanagement.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Link } from "react-router-dom";
import history from "../../../../assets/history.png";
const EventManagement = () => {
  return (
    <div className="maincreatemanage">
      <div className="contentsurveymanage">
        <div className="headersurveycontent">
          <h2> Survey Management</h2>
        </div>
        <Link to={"/Createsurvey"}>
          <AddPhotoAlternateIcon
            style={{ fontSize: 180 }}
            className="historypict"
          />
          <div className="createsurvey">
            <h1>Create</h1>
          </div>
        </Link>
        <Link to={"/EventsHistory"}>
          <div>
            <img src={history} alt="history" className="historypict" />
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
