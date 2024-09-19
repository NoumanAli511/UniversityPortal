import React, { useState } from "react";
import "./studentLogin.css";
import userprofile from "../../../assets/userprofile.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function StudentLogin() {
  const [aridNumber, setAridNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorData, setErrorData] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await fetch(
        `http://localhost/studentminiportal/api/Student/Login?aridno=${aridNumber}&password=${password}`
      );
      const data = await response.json();

      if (response.ok) {
        try {
          localStorage.setItem("student", JSON.stringify(data));
          setErrorData("");
          setPassword("");
          setAridNumber("");
          navigate("/Dashboard");
        } catch (e) {
          console.log(e);
        }
        console.log(data);
      } else {
        console.log("Error", data);
        setErrorData(data);
      }
    } catch (error) {
      console.log("Error", "An error occurred while logging in.");
      console.error("Login Error:", error);
    }
  };
  return (
    <div className="StdloginPage__mainContainer">
      <div className="StdloginPage__container">
        <img className="StdloginPage__logo" alt="" src={userprofile} />
        <div className="StdloginPage__heading">
          <h1>Student Login</h1>
        </div>
        <div className="StdloginPage__input">
          {errorData && <p>{errorData}</p>}
          <input
            className="input"
            placeholder="Enter Your ARID Number"
            onChange={(e) => setAridNumber(e.target.value)}
            value={aridNumber}
          />
          <input
            className="input"
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="button" onClick={login}>
            <span className="buttonText">Login</span>
          </button>
        </div>
        <Link to="/">
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
  );
}

export default StudentLogin;
