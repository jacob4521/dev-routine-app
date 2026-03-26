import React from "react";
import TaskCard from "./TaskCard";

const TaskBoard = ({
  newTaskTitle,
  setNewTaskTitle,
  newTaskCategory,
  setNewTaskCategory,
  handleAddTask,
  tasks,
  deleteTask,
  updateTask,
  toggleTaskDone,
  categoryColors,
  handleAddSubTask,
  toggleSubTaskDone,
  deleteSubTask,
}) => {
  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-4">
        Today's Tasks
      </h3>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Add a new task..."
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />

        <select
          value={newTaskCategory}
          onChange={(e) => setNewTaskCategory(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Coding">Coding</option>
          <option value="Studdy">Studdy</option>
        </select>

        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-4xl mb-2">☕</p>
            <h3 className="text-lg font-semibold text-gray-600">All done!</h3>
            <p className="text-gray-600">
              You have completed all your tasks for today!, take some rest.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              category={task.category}
              completed={task.completed}
              onToggle={toggleTaskDone}
              onDelete={deleteTask}
              onUpdate={updateTask}
              categoryColors={categoryColors[task.category]}
              handleAddSubTask={handleAddSubTask}
              subTasks={task.subTasks}
              toggleSubTaskDone={toggleSubTaskDone}
              deleteSubTask={deleteSubTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskBoard;
