import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./IdeaCard.css";

const IdeaCard = ({ idea, onDelete, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(idea.title);

  const handleRename = () => {
    onRename(idea.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className="idea-card">
      {isEditing ? (
        <>
          <input
            className="rename-input"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button className="save-btn" onClick={handleRename}>
            Save
          </button>
        </>
      ) : (
        <>
          <h3>{idea.title}</h3>
          <p className="category">{idea.category}</p>
        </>
      )}
      <div className="icons">
        <FaEdit onClick={() => setIsEditing(!isEditing)} />
        <FaTrash onClick={() => onDelete(idea.id)} />
      </div>
    </div>
  );
};

export default IdeaCard;
