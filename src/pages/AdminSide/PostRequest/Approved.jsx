import React from "react";

import "./postrequest.css";

const PostRequest = () => {
  return (
    <>
      <div className="postrequest__mainContainer">
        <div className="postrequest__container">
          <div className="postrequest__heading">Pending Request</div>

          <div className="eventsEdits__input">
            <div className="adminprofile__form">
              <input
                className="my-input"
                placeholder="Abdul Haq"
                type="text"
                name="Title"
              />
              <button className="viewbtn">View</button>
              <input
                className="my-input"
                placeholder="Hassan Ali"
                type="text"
                name="Title"
              />
              <button className="viewbtn">View</button>
              <input
                className="my-input"
                placeholder="Nouman"
                type="text"
                name="Title"
              />
              <button className="viewbtn">View</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostRequest;
