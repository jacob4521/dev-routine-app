import {
  Search,
  Plus,
  CheckCircle2,
  Clock,
  Circle,
  Download,
} from "lucide-react";
import TaskCard from "./TaskCard";

const TaskBoard = ({
  newTaskTitle,
  setNewTaskTitle,
  newTaskCategory,
  setNewTaskCategory,
  handleAddTask,
  runningTaskId,
  inProgressTasks = runningTaskId ? 1 : 0,
  tasks,
  deleteTask,
  updateTask,
  toggleTaskDone,
  categoryColors,
  handleAddSubTask,
  toggleTimer,
  handleAddLink,
  handleRemoveLink,
  downloadTasksBackup,
}) => {
  const mainTasks = tasks.filter((task) => task.parentId === null);
  const totalTasks = mainTasks.length;
  const completedTasks = mainTasks.filter((task) => task.completed).length;
  const toDoTasks = totalTasks - completedTasks;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-10 mt-8">
      {/* Header */}
      <div className="w-full flex justify-between items-end pb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Good Morning, Alex! 👋
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Today, 1st April 2026
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddTask(e);
              }}
              placeholder="Search tasks..."
              className="w-64 px-4 py-2.5 pl-10 bg-white border border-gray-200 rounded-xl text-sm focus-within:outline-none focus:border-orange-500"
            />
          </div>

          <button
            onClick={handleAddTask}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors"
          >
            <span className="text-lg leading-none">New Task</span>
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        {/* To Do */}
        <div className=" bg-white border border-gray-100 shadow-sm p-5 flex justify-between items-center rounded-2xl">
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">
              To do
            </p>
            <h2 className="text-3xl font-bold text-gray-900">{toDoTasks}</h2>
          </div>

          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-xl">
            <Circle className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        {/* In Progress */}
        <div className=" bg-white border border-gray-100 shadow-sm p-5 flex justify-between items-center rounded-2xl">
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">
              In Progress
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              {inProgressTasks}
            </h2>
          </div>

          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-xl">
            <Clock className="w-6 h-6 text-orange-500" />
          </div>
        </div>

        {/* Completed */}
        <div className=" bg-white border border-gray-100 shadow-sm p-5 flex justify-between items-center rounded-2xl">
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">
              Completed
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              {completedTasks}
            </h2>
          </div>

          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-xl">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex justify-between w-full gap-2 items-center border-b border-gray-200 pb-4">
        <div>
          <button className="bg-gray-900 px-5 py-2 shadow-sm rounded-lg text-white font-bold text-sm">
            All Tasks
          </button>
          <button className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-5 py-2 rounded-lg text-sm font-bold transition-colors">
            Important
          </button>
          <button className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-5 py-2 rounded-lg text-sm font-bold transition-colors">
            Work
          </button>
          <button className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-5 py-2 rounded-lg text-sm font-bold transition-colors">
            Personal
          </button>
        </div>

        <div>
          <button
            onClick={downloadTasksBackup}
            className="text-gray-700 p-2 shadow-sm rounded-lg font-bold text-sm hover:bg-gray-300 transition-colors duration-300"
          >
            <Download className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Task List Section */}
      <div className="flex flex-col gap-4">
        {mainTasks.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 mt-4">
            <p className="text-4xl mb-2">☕</p>
            <h3 className="text-lg font-semibold text-gray-600">All done!</h3>
            <p className="text-gray-600">You have no tasks for today!</p>
          </div>
        ) : (
          mainTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              category={task.category}
              completed={task.completed}
              priority={task.priority}
              onToggle={toggleTaskDone}
              onDelete={deleteTask}
              onUpdate={updateTask}
              categoryColors={
                categoryColors ? categoryColors[task.category] : undefined
              }
              handleAddSubTask={handleAddSubTask}
              allTasks={tasks}
              runningTaskId={runningTaskId}
              toggleTimer={toggleTimer}
              parentId={task.parentId}
              timeSpent={task.timeSpent}
              handleAddLink={handleAddLink}
              links={task.links}
              handleRemoveLink={handleRemoveLink}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskBoard;
