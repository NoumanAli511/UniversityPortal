import React from "react";
import "../login/login.css";
import logo from "../../assets/logo.jpeg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="loginPage__mainContainer">
        <div className="loginPage__container">
          <img className="loginPage__logo" alt="" src={logo} />
          <div className="loginPage__heading">
            <h1> Alumini Login</h1>
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
                <Link to={"/new"}>
                  <button>Login</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
