import React, { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";
import IdeaCard from "../components/IdeaCard";
import "./Home.css";
import { fetchIdeas } from "../data/IdeaData";
import ideaData from "../data/IdeaData";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useContext(UserContext);
  const [ideas, setIdeas] = useState([]);
  // const [ideas, setIdeas] = useState(ideaData);
  const navigate = useNavigate();

  const handleDelete = (ideaID) => {
    const updatedIdeas = ideas.filter((idea) => idea.ideaID !== ideaID);
    setIdeas(updatedIdeas);
  };

  const handleRename = (id, newTitle) => {
    setIdeas(
      ideas.map((idea) =>
        idea.ideaID === id ? { ...idea, name: newTitle } : idea
      )
    );
  };

  useEffect(() => {
    const loadIdeas = async () => {
      if (user?.token) {
        const data = await fetchIdeas(user.token);
        setIdeas(data);
      }
    };

    loadIdeas();
  }, [user]);

  // useEffect(() => {
  //   const loadIdeas = async () => {
  //     if (user?.token) {
  //       setIdeas(ideaData);
  //     }
  //   };

  //   loadIdeas();
  // }, [user]);

  const categories = [...new Set(ideas.map((idea) => idea.category))];

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>💡 Shitty Ideas Dump</h1>
        <button className="create-btn" onClick={() => navigate("/idea")}>
          <FaPlusCircle className="plus-icon" /> New Idea
        </button>
      </div>

      {categories.map((category) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="idea-grid">
            {ideas
              .filter((idea) => idea.category === category)
              .map((idea) => (
                <IdeaCard
                  key={idea.ideaID}
                  idea={idea}
                  onDelete={handleDelete}
                  onRename={handleRename}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
