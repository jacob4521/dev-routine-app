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
} from "lucide-react";

import React from "react";

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
}) => {
  // Local state for managing subtasks and expansion
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddingSubTask, setIsAddingSubTask] = useState(false);
  const [subTaskTitle, setSubTaskTitle] = useState("");

  // Derived state
  const isRunning = runningTaskId === id;
  const hasSubTasks =
    allTasks && allTasks.filter((task) => task.parentId === id).length > 0;
  const catColors = categoryColors || {
    bg: "bg-gray-100",
    text: "text-gray-600",
  };
  return (
    <div className="flex flex-col gap-3 w-full">
      {isExpanded ? (
        <div className="bg-gray-100 p-4 rounded-xl">Expanded Card</div>
      ) : (
        // The Main Card Container - Collapsed Task Card
        <div className="group bg-white p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-2xl flex items-center justify-between cursor-pointer">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle(id);
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
                className={`font-bold text-base transition-colors ${completed ? "text-gray-400 line-through" : "text-gray-900 group-hover:text-orange-500"}`}
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
              className={`${catColors.bg} ${catColors.text} uppercase tracking-wider text-xs rounded-md px-3 py-1`}
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
