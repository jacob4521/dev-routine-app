import { useState } from "react";
import {
  Circle,
  Clock,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Play,
  Pause,
  Plus,
  Check,
  CheckCircle2,
  Square,
  Trash2,
} from "lucide-react";

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
  timeSpent,
  isSubTask = false,
}) => {
  // Local state for managing subtasks and expansion
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddingSubTask, setIsAddingSubTask] = useState(false);
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  // Derived state
  const isRunning = runningTaskId === id;
  const hasInCompleteSubTasks = allTasks.some(
    (task) => task.parentId === id && !task.completed,
  );

  const catColors = categoryColors || {
    bg: "bg-gray-100",
    text: "text-gray-600",
  };

  const formatTime = (totalSeconds) => {
    if (!totalSeconds) return "00:00:00";
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() !== "" && editTitle !== title) {
      onUpdate(id, editTitle);
    } else {
      setEditTitle(title);
    }
    setIsEditing(false);
  };

  const subTaskCollapsed = (
    <div className="flex flex-col gap-2 w-full mt-1">
      <div className="group flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              hasInCompleteSubTasks ? setIsExpanded(!isExpanded) : onToggle(id);
            }}
            className="text-gray-300 hover:text-emerald-500 transition-colors"
          >
            {completed ? (
              <CheckSquare className="text-emerald-500" size={18} />
            ) : (
              <Square className="text-gray-300" size={18} />
            )}
          </button>

          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveEdit();
                if (e.key === "Escape") {
                  setEditTitle(title);
                  setIsEditing(false);
                }
              }}
              className="w-full bg-transparent border-b-2 border-blue-400 outline-none px-1 text-gray-900 font-medium"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              onDoubleClick={(e) => {
                e.stopPropagation();
                if (!completed) setIsEditing(true);
              }}
              className={`font-medium text-sm cursor-pointer select-none transition-colors ${completed ? "text-gray-400 line-through" : "text-gray-700 group-hover:text-gray-900"}`}
            >
              {title}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {!completed && (
            <button
              className="text-gray-400 hover:text-red-500 p-1 rounded-md hover:bg-red-200 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              <Trash2 size={16} />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-gray-400 hover:text-gray-900 p-1 rounded-md hover:bg-gray-200 transition-colors"
          >
            <ChevronRight
              size={16}
              className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="pl-6 py-2 flex flex-col gap-2 w-full border-l-2 border-gray-100 ml-3">
          {allTasks
            .filter((task) => task.parentId === id)
            .map((nestedSubTask) => (
              <TaskCard
                key={nestedSubTask.id}
                {...nestedSubTask}
                category={category}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
                categoryColors={categoryColors}
                handleAddSubTask={handleAddSubTask}
                allTasks={allTasks}
                runningTaskId={runningTaskId}
                toggleTimer={toggleTimer}
                isSubTask={true}
              />
            ))}

          {/* Add Nested SubTask Area */}
          {isAddingSubTask ? (
            <div className="flex items-center gap-2 mt-1">
              <input
                type="text"
                value={subTaskTitle}
                onChange={(e) => setSubTaskTitle(e.target.value)}
                placeholder="Add a step here..."
                className="flex-1 px-3 py-1 text-sm border border-gray-200 rounded-md outline-none focus:border-orange-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && subTaskTitle.trim()) {
                    handleAddSubTask(id, subTaskTitle, category);
                    setSubTaskTitle("");
                    setIsAddingSubTask(false);
                  }
                }}
                autoFocus
              />
            </div>
          ) : (
            <button
              onClick={() => setIsAddingSubTask(true)}
              className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-orange-500 transition-colors mt-1 w-fit"
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          )}
        </div>
      )}
    </div>
  );

  const renderSubTasks = () => (
    <div
      className={`${isSubTask ? "ml-6 pl-2 mt-2" : "ml-10 pl-4"} border-l-2 border-gray-100 flex flex-col gap-2`}
    >
      {allTasks &&
        allTasks
          .filter((task) => task.parentId === id)
          .map((subTask) => (
            <TaskCard
              key={subTask.id}
              {...subTask}
              category={category}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
              categoryColors={categoryColors}
              handleAddSubTask={handleAddSubTask}
              allTasks={allTasks}
              runningTaskId={runningTaskId}
              toggleTimer={toggleTimer}
              isSubTask={true}
            />
          ))}

      {isAddingSubTask ? (
        <div className="flex items-center gap-2 mt-1">
          <input
            type="text"
            value={subTaskTitle}
            onChange={(e) => setSubTaskTitle(e.target.value)}
            placeholder={`${isSubTask ? "Add a nested step." : "Add a step."}`}
            className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-md outline-none focus:border-orange-400 shadow-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && subTaskTitle.trim()) {
                handleAddSubTask(id, subTaskTitle, category);
                setSubTaskTitle("");
                setIsAddingSubTask(false);
              }
            }}
            autoFocus
          />
        </div>
      ) : (
        <button
          onClick={() => setIsAddingSubTask(true)}
          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-orange-500 transition-colors mt-1 w-fit py-1"
        >
          <Plus size={14} strokeWidth={3} />
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-3 w-full">
      {isExpanded ? (
        // The Main Task Row - Expanded View
        <div
          className={
            isSubTask
              ? "bg-gray-50/50 border border-gray-200 rounded-xl p-3 flex flex-col relative"
              : "bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-2xl p-4 flex flex-col gap-4 relative overflow-hidden"
          }
        >
          <div className="flex items-center justify-between">
            {isRunning && (
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
            )}
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  hasInCompleteSubTasks
                    ? setIsExpanded(!isExpanded)
                    : onToggle(id);
                }}
                className="text-gray-300 hover:text-emerald-500 transition-colors"
              >
                {completed ? (
                  <CheckCircle2 className="text-emerald-500" size={24} />
                ) : (
                  <Circle size={24} strokeWidth={2.5} />
                )}
              </button>
              <div>
                <h3
                  className="text-gray-900 font-bold cursor-pointer"
                  onClick={() => setIsExpanded(false)}
                >
                  {title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 font-medium">
                  <Clock className="w-4 h-4" />
                  <span>10:00 AM - 12:00 PM</span>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-5">
              <div
                onClick={() => toggleTimer(id)}
                className="flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg border border-orange-200 font-mono font-bold text-sm cursor-pointer"
              >
                <button className="cursor-pointer flex items-center gap-2">
                  {isRunning ? (
                    <Pause size={12} fill="currentColor" />
                  ) : (
                    <Play size={14} fill="currentColor" />
                  )}
                  {formatTime(timeSpent)}
                </button>
              </div>

              {!completed && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(id);
                  }}
                  className="text-gray-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )}

              {!isSubTask && (
                <span
                  className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${catColors}`}
                >
                  {category}
                </span>
              )}

              <div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-gray-900 p-1"
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Subtasks ටික පෙන්වන Function එක Call කරනවා */}
          {renderSubTasks()}
        </div>
      ) : isSubTask ? (
        subTaskCollapsed
      ) : (
        // The Main Card Container - Collapsed Task Card
        <div className="group bg-white p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-2xl flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                hasInCompleteSubTasks
                  ? setIsExpanded(!isExpanded)
                  : onToggle(id);
              }}
              className="text-gray-300 hover:text-emerald-500 transition-colors"
            >
              {completed ? (
                <CheckCircle2 className="text-emerald-500" size={24} />
              ) : (
                <Circle size={24} strokeWidth={2.5} />
              )}
            </button>
            <div>
              <div
                onClick={() => setIsExpanded(true)}
                className={`font-bold text-base transition-colors cursor-pointer ${completed ? "text-gray-400 line-through" : "text-gray-900 group-hover:text-orange-500"}`}
              >
                {title}
              </div>
              <div className="flex items-center gap-2 text-gray-500 mt-1 font-medium">
                <Clock className="w-4 h-4" />
                <span>02:00 PM - 03:00 PM</span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTimer(id);
                setIsExpanded(true);
              }}
              className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all ${isRunning ? "bg-orange-100 border-orange-300 text-orange-600" : "bg-gray-50 border-gray-200 text-gray-400 hover:text-orange-500 hover:border-orange-300 hover:bg-orange-50"}  hover:border-orange-300 hover:bg-orange-50`}
            >
              {isRunning ? (
                <Pause size={14} fill="currentColor" />
              ) : (
                <Play size={14} fill="currentColor" className="ml-0.5" />
              )}
            </button>

            <span
              className={`${catColors} uppercase tracking-wider text-xs rounded-md px-3 py-1`}
            >
              {category}
            </span>
            <span className="text-gray-400 group-hover:text-gray-900 transition-colors">
              <ChevronRight
                className="w-5 h-5 text-gray-400"
                onClick={() => setIsExpanded(true)}
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
