import React from "react";

const IdeaInbox = ({
  newIdeaTitle,
  setNewIdeaTitle,
  handleAddIdea,
  inboxIdeas,
  handlePlanIdea,
}) => {
  return (
    <div>
      <input
        type="text"
        value={newIdeaTitle}
        onChange={(e) => setNewIdeaTitle(e.target.value)}
      />
      <button onClick={() => handleAddIdea(newIdeaTitle)}>Add</button>

      {inboxIdeas.map((idea) => (
        <div key={idea.id}>
          {idea.title}
          <button onClick={() => handlePlanIdea(idea)}>Plan Idea</button>
        </div>
      ))}
    </div>
  );
};

export default IdeaInbox;
