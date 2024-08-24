import React, { useEffect, useState } from "react";
import "./jobannnouncement.css";
// import Api from "../../../LinkApi";
import { useNavigate } from "react-router-dom";

const JobScreen = () => {
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [city, setCity] = useState("");
  const [stdid, setStdId] = useState(null);
  const navigate = useNavigate();

  const _retrieveData = async () => {
    try {
      const value = localStorage.getItem("student");
      if (value !== null) {
        const parsedadmin = JSON.parse(value);
        setStdId(parsedadmin[0].student_id);
        console.log(parsedadmin[0].student_id);
      }
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };

  const saveJobDetails = async () => {
    try {
      const formData = new FormData();
      formData.append("company", company);
      formData.append("designation", designation);
      formData.append("city", city);
      const response = await fetch(
        `http://192.168.1.43/TestApi/api/Student/CreateJobDetails?stdid=${stdid}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      } else {
        console.log("error: ", data);
        console.log(company, designation, city);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Job Details</h1>
      <div className="inputContainer">
        <input
          className="input"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div className="inputContainer">
        <input
          className="input"
          placeholder="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
      </div>
      <div className="inputContainer">
        <input
          className="input"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <button className="saveButton" onClick={saveJobDetails}>
        <span className="buttonText">Save</span>
      </button>
    </div>
  );
};

export default JobScreen;
