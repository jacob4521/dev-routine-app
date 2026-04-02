import {
  SearchIcon,
  Plus,
  CheckCircle2,
  Clock,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Play,
  Circle,
  Pause,
} from "lucide-react";

const TaskPractice = () => {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 p-8 pb-10">




      <div className="flex flex-col gap-4">
        <div className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-2xl p-4 flex flex-col gap-4">
          {/* The Main Task Row */}
          <div className="flex items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <Circle className="w-5 h-5 text-gray-300" />
              <div>
                <h3 className="text-gray-900 font-bold">Design landing page</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 font-medium">
                  <Clock className="w-4 h-4" />
                  <span>10:00 AM - 12:00 PM</span>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg border border-orange-200 font-mono font-bold text-sm">
                <Pause size={12} fill="currentColor" />
                00:45:12
              </div>

              <span className="px-3 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-500 uppercase tracking-wider">
                Work
              </span>

              <div>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* The Subtasks Section */}
          <div className="ml-10 pl-4 border-l-2 border-gray-100 flex flex-col gap-3">
            {/* SubTask 1 */}
            <div className="flex items-center gap-3">
              <CheckSquare className="w-4 h-4 text-gray-300" />
              <span className="text-sm font-medium text-gray-700">
                Wireframe the hero section
              </span>
            </div>
            {/* SubTask 2 */}
            <div className="flex items-center gap-3">
              <CheckSquare className="w-4 h-4 text-gray-300" />
              <span className="text-sm font-medium text-gray-700">
                Wireframe the hero section
              </span>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default TaskPractice;
