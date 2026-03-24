import { useState } from "react";

const TaskCard = ({
  id,
  title,
  category,
  completed,
  onToggle,
  onDelete,
  onUpdate,
  categoryColors,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleSave = () => {
    onUpdate(id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-100">
      <div>
        {isEditing ? (
          <input
            type="text"
            className="border border-blue-400 px-2 py-1 rounded w-full outline-none"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <h2
            className={`font-bold ${completed ? "line-through text-gray-400" : "text-gray-800"}`}
          >
            {title}
          </h2>
        )}

        <p
          className={`text-xs font-medium px-2 py-1 ${categoryColors} rounded-md mt-1 inline-block`}
        >
          {category}
        </p>
      </div>

      <div className="flex gap-3 items-center">
        <button
          onClick={() => onToggle(id)}
          className={`w-6 h-6 rounded-full border-2 cursor-pointer flex items-center justify-center transition-colors ${
            completed
              ? "bg-green-500 border-green-500"
              : "border-gray-300 hover:border-green-500"
          }`}
        >
          {completed && <span className="text-white text-xs">✔</span>}
        </button>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="text-blue-500 hover:bg-blue-50 px-2 py-1 rounded-md transition-colors text-sm font-medium"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-gray-400 hover:text-white hover:bg-red-500 px-2 py-1 rounded-md transition-colors font-bold"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
