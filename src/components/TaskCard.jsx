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
  toggleSubTaskDone,
  deleteSubTask,
  allTasks,
  runningTaskId,
  toggleTimer,
  parentId,
  timeSpent,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddingSubTask, setIsAddingSubTask] = useState(false);

  const handleSave = () => {
    onUpdate(id, newTitle);
    setIsEditing(false);
  };

  const formatTime = (totalSeconds) => {
    if (!totalSeconds) return "00:00:00";
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);

    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const hasSubTasks =
    allTasks.filter((task) => task.parentId === id).length > 0;

  // මේ Task එකේ සහ මෙයාගේ යටතේ ඉන්න හැම Subtask එකකම මුළු වෙලාව එකතු කරන Function එක
  const getTotalTime = () => {
    const ownTime = timeSpent || 0;
    const subTasksTime = allTasks
      .filter((t) => t.parentId === id)
      .reduce((sum, sub) => sum + (sub.timeSpent || 0), 0);

    return ownTime + subTasksTime;
  };

  return (
    <div className="bg-white p-4 shadow-md border border-gray-100 flex flex-col gap-4">
      {/* Task Title */}
      <div className=" flex justify-between items-center">
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

        {/* Task Actions */}
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
            ✕
          </button>
        </div>

        <div className="flex items-center gap-2 mr-4">
          {/* වෙලාව පෙන්වන තැන */}
          <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
            {formatTime(parentId ? timeSpent : getTotalTime())}
          </span>

          {/* Start/Stop Button */}
          <button
            onClick={() => toggleTimer(id)}
            className={`p-1.5 rounded-full transition-colors ${
              runningTaskId === id
                ? "bg-red-100 text-red-600 animate-pulse"
                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
            }`}
          >
            {runningTaskId === id ? "⏹" : "▶️"}
          </button>
        </div>
      </div>

      {/* SubTasks */}
      <div className="border-t border-gray-100 pt-4 mt-2">
        {/* SubTask Input */}
        {isAddingSubTask && (
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add a small step..."
              className="flex-1 border-gray-200 border-2 px-3 py-1.5 text-sm rounded-md outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white"
              value={subTaskTitle}
              onChange={(e) => setSubTaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && subTaskTitle.trim() !== "") {
                  handleAddSubTask(id, subTaskTitle, category);
                  setSubTaskTitle("");
                }
              }}
            />

            <button
              onClick={() => {
                if (subTaskTitle.trim() !== "") {
                  handleAddSubTask(id, subTaskTitle, category);
                  setSubTaskTitle("");
                }
              }}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-4 py-1.5 text-sm rounded-md font-medium transition-colors whitespace-nowrap"
            >
              Add Step
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => setIsAddingSubTask(!isAddingSubTask)}
            className="hover:bg-gray-200 rounded-sm p-1"
          >
            {isAddingSubTask ? "X" : "➕"}
          </button>
          {hasSubTasks && (
            <button
              className="hover:bg-gray-200 rounded-sm p-1"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "🔽" : "▶️"}
            </button>
          )}
        </div>
      </div>

      {isExpanded && hasSubTasks && (
        <div className="ml-6 pl-4 border-l-2 border-gray-200 mt-4 flex flex-col gap-4">
          {allTasks
            .filter((task) => task.parentId === id)
            .map((subTask) => (
              <TaskCard
                key={subTask.id}
                id={subTask.id}
                title={subTask.title}
                category={subTask.category}
                completed={subTask.completed}
                allTasks={allTasks}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
                categoryColors={categoryColors}
                handleAddSubTask={handleAddSubTask}
                toggleSubTaskDone={toggleSubTaskDone}
                deleteSubTask={deleteSubTask}
                runningTaskId={runningTaskId}
                toggleTimer={toggleTimer}
                parentId={subTask.parentId}
                timeSpent={subTask.timeSpent}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
