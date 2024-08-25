import React, { useEffect, useState } from "react";
import "./jobannnouncement.css";
// import Api from "../../../LinkApi";
import { useNavigate } from "react-router-dom";

const JobScreen = () => {
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [city, setCity] = useState("");
  const [desc, setDesc] = useState("");

  const [stdid, setStdId] = useState(null);
  const navigate = useNavigate();

  const _retrieveData = async () => {
    try {
      const value = localStorage.getItem("student");
      if (value !== null) {
        const parsedadmin = JSON.parse(value);
        setStdId(parsedadmin.student_id);
      }
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };

  const saveJobDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/Student/CreateJob?title=${jobTitle}&company=${company}&description=${desc}&student_id=${stdid}`,
        {
          method: "POST",
          "Content-Type": "application/json",
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(data);
        navigate(-1);
      } else {
        console.log("error: ", data);
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
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
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
          placeholder="Address"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="inputContainer">
        <textarea
          className="input"
          placeholder="Job Description..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          multiple
          style={{ height: "100px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <button
          style={{
            backgroundColor: "black",
            border: 0,
            width: "80px",
            height: 40,
            borderRadius: 10,
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => navigate(-1)}
        >
          <span className="buttonText">Back</span>
        </button>
        <button className="saveButton" onClick={saveJobDetails}>
          <span className="buttonText">Save</span>
        </button>
      </div>
    </div>
  );
};

export default JobScreen;
