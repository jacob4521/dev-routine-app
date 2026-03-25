import React from "react";

const IdeaInbox = ({
  newIdeaTitle,
  setNewIdeaTitle,
  handleAddIdea,
  inboxIdeas,
  handlePlanIdea,
  deleteIdea,
}) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-4">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        💡 Idea Inbox
      </h3>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Got a new idea? Type it here..."
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          value={newIdeaTitle}
          onChange={(e) => setNewIdeaTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddIdea(newIdeaTitle);
            }
          }}
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
          onClick={() => handleAddIdea(newIdeaTitle)}
        >
          Add Idea
        </button>
      </div>

      <div className="space-y-3">
        {inboxIdeas.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-3xl mb-2">🧠</p>
            <p>No ideas yet. Brainstorm something awesome!</p>
          </div>
        ) : (
          inboxIdeas.map((idea) => (
            <div
              key={idea.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow group"
            >
              <span className="text-gray-800 font-medium">{idea.title}</span>
              <div className="flex gap-2">
                <button
                  className="text-sm bg-white border-gray-300 hover:border-blue-500 hover:text-blue-600 px-4 py-1.5 rounded-md font-medium transition-colors shadow-sm"
                  onClick={() => handlePlanIdea(idea)}
                >
                  Plan Idea 🚀
                </button>
                <button
                  className="cursor-pointer"
                  onClick={() => deleteIdea(idea.id)}
                >
                  ❌
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IdeaInbox;
