import React from "react";
import "../AlumniLogin/alumnilogin.css";
import userprofile from "../../../assets/userprofile.png";
import { Link } from "react-router-dom";

const AlumniLogin = () => {
  return (
    <>
      <div className="loginPage__mainContainer">
        <div className="loginPage__container">
          <img className="loginPage__logo" alt="" src={userprofile} />
          <div className="loginPage__heading">
            <h1>Alumni Login</h1>
          </div>
          <div className="loginPage__input">
            <div className="login__form">
              <input
                className="my-input"
                placeholder="Arid Number"
                type="text"
              />
              <input
                type="text"
                name="password"
                id="password"
                className="my-input"
                placeholder="Password"
              />
              <div>
                <Link to={"/Dashboard"}>
                  <button className="alumnibtn">Login</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlumniLogin;
