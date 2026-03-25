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

      <div className="border-t border-gray-100 pt-4 mt-2">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a small step..."
            className="flex-1 border-gray-200 px-3 py-1.5 text-sm rounded-md outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white"
            value={subTaskTitle}
            onChange={(e) => setSubTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && setSubTaskTitle.trim() !== "") {
                handleAddSubTask(id, subTaskTitle);
                setSubTaskTitle("");
              }
            }}
          />

          <button
            onClick={() => {
              if (subTaskTitle.trim() !== "") {
                handleAddSubTask(id, subTaskTitle);
              }
              handleAddSubTask(id, subTaskTitle);
              setSubTaskTitle("");
            }}
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-4 py-1.5 text-sm rounded-md font-medium transition-colors whitespace-nowrap"
            onKeyDown={(e) => {
              if (e.key === "Enter" && subTaskTitle.trim() !== "") {
                handleAddSubTask(id, subTaskTitle);
                setSubTaskTitle("");
              }
            }}
          >
            Add Step
          </button>
        </div>
      </div>

      <ul className="space-y-1.5">
        {subTasks?.map((subTask) => (
          <li
            key={subTask.id}
            className="flex items-center gap-3 text-sm p-2 rounded-md hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group:"
          >
            <input
              type="checkbox"
              checked={subTask.completed}
              onChange={() => toggleSubTaskDone(id, subTask.id)}
              className="cursor-pointer w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />

            <span
              className={`flex-1 transition-colors duration-200 ${subTask.completed ? "line-through text-gray-400" : "text-gray-700 font-medium"}`}
            >
              {subTask.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskCard;
