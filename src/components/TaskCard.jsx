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
  handleAddSubTask,
  subTasks,
  toggleSubTaskDone,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [subTaskTitle, setSubTaskTitle] = useState("");

  const handleSave = () => {
    onUpdate(id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 shadow-md border border-gray-100 flex flex-col gap-4">
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

      <div className="border-t border-gray-100 pt-3 text-sm">
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={subTaskTitle}
            onChange={(e) => setSubTaskTitle(e.target.value)}
          />
          <button
            onClick={() => {
              handleAddSubTask(id, subTaskTitle);
              setSubTaskTitle("");
            }}
          >
            Add Subtask
          </button>
        </div>
      </div>

      <ul className="space-y-2 mt-3">
        {subTasks?.map((subTask) => (
          <li
            key={subTask.id}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <input
              type="checkbox"
              checked={subTask.completed}
              onChange={() => toggleSubTaskDone(id, subTask.id)}
              className="cursor-pointer w-4 h-4 text-blue-600 rounded border-gray-600 focus:ring-blue-500"
            />

            <span className={`${subTask.completed ? "line-through text-gray-400" : ""}`}>{subTask.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskCard;
