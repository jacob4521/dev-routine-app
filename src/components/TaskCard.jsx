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
  allTasks,
  runningTaskId,
  toggleTimer,
  parentId,
  timeSpent,
  isSubTask = false,
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
    <div
      className={`group transition-all duration-200 ${isSubTask ? "bg-transparent py-2 pl-4 border-l-2 border-gray-200 hover:border-blue-400" : "bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-4 hover:shadow-md"}`}
    >
      {/* Task Header Area */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            className="h-5 w-5 rounded appearance-none border border-gray-200 bg-gray-50 hover:border-blue-500 cursor-pointer mt-3"
          />
          <div className="flex flex-col">
            <h2 className="font-semibold">The First Task</h2>
            <button
              disabled
              className="text-xs bg-blue-100 rounded-xl text-blue-600 font-medium px-2 py-1 w-fit"
            >
              Work
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <button className="border-gray-200 border bg-gray-50 px-2 py-1 rounded-l-lg text-xs">
              00:00:00
            </button>
            <button className="border-gray-200 border px-2 py-1 rounded-r-lg text-xs">
              ▶ Start
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="">✏️</button>
            <button className="">🗑️</button>
          </div>
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
