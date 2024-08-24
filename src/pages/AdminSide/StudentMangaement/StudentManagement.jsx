import React from "react";
import "./studentmanagement.css";
import logo from "../../../assets/logo.jpeg";

const StudentManage = () => {
  return (
    <>
      <div className="addstudentmain">
        <div className="addstudentmanag_container">
          <div className="headercontentaddstudent">
            <h2>Student Managment</h2>
          </div>
          <div className="addstudentpic">
            <img className="profilePage__logo" src={logo} alt="logo" />
          </div>{" "}
          <div className="startaddstudent">
            <h2>Details</h2>
          </div>
          <div className="inputaddstudent">
            <div className="addstudent__form">
              <input
                className="my-inputaddstudent "
                placeholder="Name"
                type="text"
                name="Title"
              />
              <input
                className="my-inputaddstudent "
                placeholder="Phone"
                type="text"
                name="Phone"
              />
              <input
                className="my-inputaddstudent "
                placeholder="AridNo"
                type="text"
                name="AridNo"
              />
              <input
                className="my-inputaddstudent "
                placeholder="Email"
                type="text"
                name="Email"
              />
              <input
                className="my-inputaddstudent "
                placeholder="Password"
                type="text"
                name="Password"
              />
            </div>
          </div>
          <div className="creatstudentssbutton">
            <button className="editbuton">Edit</button>
            <button className="editbuton">Upload</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentManage;
