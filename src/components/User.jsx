import React, { useState } from "react";
import { useEffect } from "react";

export default function User({ user }) {
  const { id, image, mail, name, title } = user;
  const [likes, setLikes] = useState(0);
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    console.log("Likes:", likes);
  }, [likes]);

  useEffect(() => {
    if (likes === 10) alert("Du har nået 10 likes!");
  }, [likes]);

  return (
    <div className="user-card">
      <img src={image} />
      <h2>{name}</h2>
      <h4>{title}</h4>
      <p>Mail: {mail}</p>
      <button onClick={() => setLikes(likes + 1)}>Like {likes}</button>
      <button onClick={() => setLikes(0)}>Reset likes</button>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Skjul" : "Vis"} detaljer
      </button>
      {showDetails && (
        <div>
          <h3>{id}</h3>
        </div>
      )}
    </div>
  );
}
