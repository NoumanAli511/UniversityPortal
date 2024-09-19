import React, { useState } from "react";
import "./adminlogin.css";
import userprofile from "../../../assets/userprofile.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = `http://localhost/studentminiportal/api/miniportal/Adminlogin?username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`;

      const response = await fetch(url, {
        method: "GET",
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok && data.message === "Login successful") {
        navigate("/AdminDashboard");
        localStorage.setItem("admin", JSON.stringify(data));
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AdmnloginPage__mainContainer">
      <div className="AdmnloginPage__container">
        <img className="AdmnloginPage__logo" alt="" src={userprofile} />
        <div className="AdmnloginPage__heading">
          <h1>Admin Login</h1>
        </div>
        <div className="AdmnloginPage__input">
          <form className="Admnlogin__form" onSubmit={handleLogin}>
            <input
              className="Admnmy-input"
              placeholder="Admin"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              className="Admnmy-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error">{error}</p>}
            <div>
              <button className="adminbtn" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
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
};

export default AdminLogin;
