import React from "react";
import "../landingPage/landingPage.css";
import logo from "../../assets/logo.jpeg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className="landingPage__mainContainer">
        <div className="landingPage__container">
          <img className="landingPage__logo" src={logo} alt="logo" />
          <div className="landingPage__heading">
            <h1>Welcome to Student Mini Portal</h1>
          </div>
          <div className="landingPage__btns">
            <Link to="/StudentLogin">
              <button className="btn">Student</button>
            </Link>
            {/* <Link to="/AluminiLogin"> 
              <button className="btn">Alumini</button>
            </Link>*/}
            <Link to="/AdminLogin">
              <button className="btn">Admin</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
