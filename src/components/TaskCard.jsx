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
  Pencil,
  Link as LinkIcon,
  ExternalLink,
  X,
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
  handleAddLink,
  links = [],
  handleRemoveLink,
  priority,
  handlePriorityChange,
}) => {
  // Local state for managing subtasks and expansion
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddingSubTask, setIsAddingSubTask] = useState(false);
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [newLink, setNewLink] = useState("");
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  // Derived state
  const isRunning = runningTaskId === id;
  const hasInCompleteSubTasks = allTasks.some(
    (task) => task.parentId === id && !task.completed,
  );

  const getDescendantsTime = (parentId) => {
    return allTasks
      .filter((task) => task.parentId === parentId)
      .reduce((total, child) => {
        return total + (child.timeSpent || 0) + getDescendantsTime(child.id);
      }, 0);
  };

  const totalTimeSpent = (timeSpent || 0) + getDescendantsTime(id);

  const priorityButtonColors = {
    High: "bg-red-300 hover:bg-red-500",
    Medium: "bg-blue-300 hover:bg-blue-500",
    Low: "bg-gray-300 hover:bg-gray-500",
  }

  const formatTime = (totalSeconds) => {
    if (!totalSeconds) return "00:00:00";
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim() !== "" && editedTitle !== title) {
      onUpdate(id, editedTitle);
    } else {
      setEditedTitle(title);
    }
    setIsEditing(false);
  };

  const onAddNewLink = () => {
    if (!handleAddLink) return;
    if (newLink.trim() !== "") {
      handleAddLink(id, newLink);
      setNewLink("");
    }
  };

  const priorityColors = {
    High: "text-red-300 hover:text-red-500",
    Medium: "text-blue-300 hover:text-blue-500",
    Low: "text-gray-300 hover:text-gray-500",
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
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveEdit();
                if (e.key === "Escape") {
                  setEditedTitle(title);
                  setIsEditing(false);
                }
              }}
              className="bg-transparent border-b border-blue-400 outline-none px-1 text-gray-900 w-full"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className={`font-medium text-sm cursor-pointer select-none transition-colors ${completed ? "text-gray-400 line-through" : "text-gray-700 group-hover:text-gray-900"}`}
            >
              {title}
            </div>
          )}
          {timeSpent > 0 && (
            <span className="border-2 border-orange-300 rounded-md p-0.5 px-1 text-[10px] font-mono text-orange-500 font-bold leading-none mt-1">
              {formatTime(totalTimeSpent)}
            </span>
          )}
        </div>

        <div
          className={`flex items-center gap-2 transition-opacity ${isRunning ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        >
          {!completed && (
            <button
              className={`p-1 rounded-md transition-all ${isRunning ? "bg-orange-100 text-orange-600 shadow-md" : "text-gray-400 hover:text-orange-500 hover:bg-orange-200"}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleTimer(id);
              }}
            >
              {isRunning ? (
                <Pause size={14} fill="currentColor" />
              ) : (
                <Play size={14} fill="currentColor" />
              )}
            </button>
          )}

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
          {!completed && (
            <button
              className="text-gray-400 hover:text-blue-500 p-1 rounded-md hover:bg-blue-200 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              <Pencil size={16} />
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
                handleAddLink={handleAddLink}
                links={nestedSubTask.links}
                handleRemoveLink={handleRemoveLink}
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
              handleAddLink={handleAddLink}
              links={subTask.links}
              handleRemoveLink={handleRemoveLink}
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
                  <Circle
                    className={
                      priorityColors[priority] ||
                      "text-gray-300 hover:text-gray-500"
                    }
                    size={24}
                    strokeWidth={2.5}
                  />
                )}
              </button>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onBlur={handleSaveEdit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveEdit();
                      if (e.key === "Escape") {
                        setEditedTitle(title);
                        setIsEditing(false);
                      }
                    }}
                    className="bg-transparent border-b border-blue-400 outline-none px-1 text-gray-900 w-full"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <h3
                    className="text-gray-900 font-bold cursor-pointer"
                    onClick={() => setIsExpanded(false)}
                  >
                    {title}
                  </h3>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 font-medium">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLinkModalOpen(true);
                    }}
                    className="flex items-center cursor-pointer gap-1 px-2 py-px bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors"
                  >
                    <LinkIcon className="w-3 h-3" />
                    <span>{links.length}</span>
                  </button>
                  <span>10:00 AM - 12:00 PM</span>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-5">
              <div
                onClick={() => {
                  if (!completed) toggleTimer(id);
                }}
                className="flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg border border-orange-200 font-mono font-bold text-sm cursor-pointer"
              >
                <button className="cursor-pointer flex items-center gap-2">
                  {isRunning ? (
                    <Pause size={12} fill="currentColor" />
                  ) : (
                    <Play size={14} fill="currentColor" />
                  )}
                  {formatTime(totalTimeSpent)}
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

              {!completed && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="text-gray-400 hover:text-blue-500 p-1 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <Pencil size={16} />
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
                <CheckCircle2
                  className={`${priorityColors[priority]} || text-emerald-500`}
                  size={24}
                />
              ) : (
                <Circle
                  className={
                    priorityColors[priority] ||
                    "text-gray-300 hover:text-gray-500"
                  }
                  size={24}
                  strokeWidth={2.5}
                />
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

            <button
              className={`${priorityButtonColors[priority]} uppercase tracking-wider text-xs rounded-md px-3 py-1`}
              onClick={() => handlePriorityChange(id)}
            >
              {priority || "No Priority"}
            </button>
            <span className="text-gray-400 group-hover:text-gray-900 transition-colors">
              <ChevronRight
                className="w-5 h-5 text-gray-400"
                onClick={() => setIsExpanded(true)}
              />
            </span>
          </div>
        </div>
      )}

      {/* Link Modal */}
      {isLinkModalOpen && (
        // Backdrop blur and dark overlay
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          {/* Modal Content */}
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-5 border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">Resources</h3>
              <button className="cursor-pointer">
                <X
                  className="w-5 h-5"
                  onClick={() => setIsLinkModalOpen(false)}
                />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-3 mb-6 max-h-60 overflow-y-auto pr-2">
              {links.length === 0 ? (
                <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="text-sm text-gray-500">No links added yet.</p>
                </div>
              ) : (
                links.map((link, index) => {
                  if (typeof link !== "string") return null;

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 group/item"
                    >
                      <a
                        key={index}
                        href={
                          link.startsWith("http") ? link : `https://${link}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 rounded-xl text-sm text-gray-700 hover:text-blue-700 transition-all border border-gray-100 group"
                      >
                        <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:text-blue-600 text-gray-400">
                          <LinkIcon className="w-4 h-4 shrink-0" />
                        </div>
                        <span className="truncate">{link}</span>
                      </a>
                      <button
                        onClick={() => handleRemoveLink(id, index)}
                        className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                        title="Remove Link"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Add link input */}
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Paste your URL here..."
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onAddNewLink();
                }}
                className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <button
                onClick={onAddNewLink}
                disabled={newLink.trim() === ""}
                className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
