import React from "react";
import "../alumniprofile/alumniprofile.css";
import logo from "../../../assets/logo.jpeg";

const Alumniprofile = () => {
  return (
    <>
      <div className="alumniprofilePage__mainContainer">
        <div className="alumniprofilePage__container">
          <img className="alumniprofilePage__logo" src={logo} alt="logo" />
          <div className="alumniprofilePage__heading"></div>
          <div className="alumniprofilePage__input">
            <div className="alumniprofile__form">
              <input
                className="my-input"
                placeholder="Name"
                type="text"
                name="Name"
              />
              <input
                className="my-input"
                placeholder="Arid-Number"
                type="text"
                name="AridNumber"
              />
              <input
                className="my-input"
                placeholder="Email"
                type="text"
                name="Email"
              />
              <input
                type="text"
                name="Phone Number"
                className="my-input"
                placeholder="Phone Number"
              />
              <input
                type="text"
                name="Degree"
                className="my-input"
                placeholder="Degree"
              />
            </div>
            <br></br>
            <div className="rows_btn">
              <button className="editbtn">Edit</button>
              <button className="editbtn">Save </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alumniprofile;
