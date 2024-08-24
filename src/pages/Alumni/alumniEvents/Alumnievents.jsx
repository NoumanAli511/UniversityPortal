import React from "react";
import "../alumniEvents/alumnievents.css";
import logo from "../../../assets/logo.jpeg";
const Alumnievents = () => {
  return (
    <div className="alumnievents_maincontainer">
      <div className="alumnievents_contaier">
        <div className="alumnievents_heading">
          <h1>Events</h1>
        </div>
        <img className="alumnievents_image" alt="logo" src={logo} />
        <div className="btnView3">
          <button type="submit">View</button>
        </div>
        <img className="alumnievents_image" alt="logo" src={logo} />
        <div className="btnView3">
          <button type="submit">View</button>
        </div>
        <img className="alumnievents_image" src={logo} alt="logo" />
        <div className="btnView3">
          <button type="submit">View</button>
        </div>
      </div>
    </div>
  );
};

export default Alumnievents;
