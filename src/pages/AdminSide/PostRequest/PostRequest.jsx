import React from "react";
import { useNavigate } from "react-router-dom";
import "./postrequest.css";

const PendingRequest = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="itemContainer">
        <span className="icon">👤</span>
        <span className="text">User 1</span>
        <button className="button" onClick={() => navigate("/ViewResult")}>
          <span className="buttonText">View</span>
        </button>
      </div>
      <div className="itemContainer">
        <span className="icon">👤</span>
        <span className="text">User 2</span>
        <button className="button" onClick={() => navigate("/ViewResult")}>
          <span className="buttonText">View</span>
        </button>
      </div>
      <div className="itemContainer">
        <span className="icon">👤</span>
        <span className="text">User 3</span>
        <button className="button" onClick={() => navigate("/ViewResult")}>
          <span className="buttonText">View</span>
        </button>
      </div>
    </div>
  );
};

export default PendingRequest;
