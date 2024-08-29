import React from "react";
import "./surveyhistory.css.css";
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link } from "react-router-dom";

const Eventshistory = () => {
  return (
    <>
      <div className="mainsurveyhistory">
        <div className="contentsurveyhistory">
          <div className="headercontentsurveyhistory">
            <h1> Events History</h1>
          </div>
          <Link to="/EventEdit">
            <div className="historydivs">
              <div className="dividers">
                <h1>Sports Week</h1>
              </div>
              <div>
                <AddPhotoAlternate style={{ fontSize: 45 }} />
              </div>
            </div>
          </Link>

          <div className="historydiv">
            <div className="dividers">
              <h1>Gala</h1>
            </div>
            <div>
              <AddPhotoAlternate style={{ fontSize: 45 }} />
            </div>
          </div>
          <div className="historydiv">
            <div className="dividers">
              <h2>University Education</h2>
            </div>
            <div>
              <AddPhotoAlternate style={{ fontSize: 45 }} />
            </div>
          </div>
          <div className="historydiv">
            <div className="dividers">
              <h2>Alumni Dinner</h2>
            </div>
            <div>
              <AddPhotoAlternate style={{ fontSize: 45 }} />
            </div>
          </div>

          <div className="historydiv">
            <div className="dividers">
              <h2>E-Gamings</h2>
            </div>
            <div>
              <AddPhotoAlternate style={{ fontSize: 45 }} />
            </div>
          </div>
          <div>
            <Link to="/EventsManagement" className="survey__buttnn">
              <button className="buttnn">Exit</button>
            </Link>
          </div>
          <Link to="/AdminDashboard">
            <div
              className="Admindashboardback__btn"
              style={{ marginTop: "20px" }}
            >
              <ArrowBackIcon style={{ fontSize: 45 }} />
              <h2>Back</h2>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Eventshistory;
