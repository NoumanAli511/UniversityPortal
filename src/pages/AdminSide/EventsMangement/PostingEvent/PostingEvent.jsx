import React, { useState } from "react";

function PostingEvent({ addNewEvent }) {
  const [username, setUsername] = useState("");
  const [venue, setVenue] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = () => {
    const newEvent = { username, venue, title, description, imageUrl };
    addNewEvent(newEvent);
    setUsername("");
    setVenue("");
    setTitle("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <div className="posting-event">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Venue"
        value={venue}
        onChange={(e) => setVenue(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Event</button>
    </div>
  );
}

export default PostingEvent;
