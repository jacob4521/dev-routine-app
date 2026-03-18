import { useState } from "react";
import TaskCard from "./components/TaskCard";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn React State",
      category: "Learning",
      completed: false,
    },
    {
      id: 2,
      title: "30 mins Morning Workout",
      category: "Exercise",
      completed: true,
    },
    {
      id: 3,
      title: "Build DevRoutine UI",
      category: "Coding",
      completed: false,
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      category: "Personal Tasks",
      completed: false,
    };

    setTasks([newTask, ...tasks]);

    setNewTaskTitle("");
  };

  const deleteTask = (taskID) => {
    const remainingTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(remainingTasks);
  };

  const toggleTaskDone = (taskID) => {
    console.log("Hi toglleTaskDone clicked.");
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskID) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  return (
    <MainLayout>
      {/* sdsada */}
      {/* මේ පහළින් තියෙන ටික තමයි අර MainLayout එකේ 'children' විදිහට යන්නේ */}
      <div>
        <h2 className="text-3xl font-bold">Welcome to Dashboard! 🚀</h2>

        <div className="max-w-2xl">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
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

            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              category={task.category}
              completed={task.completed}
              onToggle={toggleTaskDone}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
