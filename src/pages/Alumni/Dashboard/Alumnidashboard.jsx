import React from "react";
import "./alumnidashboard.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const Alumnidashboard = () => {
  return (
    <>
      <div className="Alumnidashboard__maincontainer">
        <div className="Alumnidashboard__content">
          <h3 className="biit">BIIT STUDENT PORTAL</h3>

          <Link to={"/alumniprofile"}>
            <div className="Alumnidashboard__btn">
              <h2>Profile</h2>
            </div>
          </Link>

          <div className="Alumnidashboard__btn">
            <Link to={"/alumniEvents"}>
              <h2>Events</h2>
            </Link>
          </div>
          <DeleteIcon />

          <Link to={"/chats"}>
            <div className="Alumnidashboard__btn">
              <h2>Chatbox</h2>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Alumnidashboard;
