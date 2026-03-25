import { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";
import MainLayout from "./layouts/MainLayout";
import IdeaInbox from "./components/IdeaInbox";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("dev-tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [inboxIdeas, setInboxIdeas] = useState(() => {
    const savedIdeas = localStorage.getItem("dev-ideas");

    return savedIdeas ? JSON.parse(savedIdeas) : [];
  });

  const [newIdeaTitle, setNewIdeaTitle] = useState("");

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [activeTab, setActiveTab] = useState("tasks");

  const [newTaskCategory, setNewTaskCategory] = useState("Work");

  const categoryColors = {
    Work: "bg-red-100 text-red-600",
    Personal: "bg-green-100 text-green-600",
    Coding: "bg-purple-100 text-purple-600",
    Studdy: "bg-yellow-100 text-yellow-600",
  };

  useEffect(() => {
    localStorage.setItem("dev-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("dev-ideas", JSON.stringify(inboxIdeas));
  }, [inboxIdeas]);

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      category: newTaskCategory,
      completed: false,
      subTasks: [],
    };

    setTasks([newTask, ...tasks]);

    setNewTaskTitle("");
    setNewTaskCategory("Work");
  };

  const deleteTask = (taskID) => {
    const remainingTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(remainingTasks);
  };

  const updateTask = (id, newTitle) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, title: newTitle };
      }
      return task;
    });
    setTasks(updatedTasks);
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

  const handleAddIdea = (ideaTitle) => {
    if (ideaTitle.trim() === "") return;

    const newIdea = {
      id: Date.now(),
      title: ideaTitle,
    };

    setInboxIdeas([newIdea, ...inboxIdeas]);
    setNewIdeaTitle("");
  };

  const handlePlanIdea = (idea) => {
    setNewTaskTitle(idea.title);
    setActiveTab("tasks");

    const remainingIdeas = inboxIdeas.filter((item) => item.id !== idea.id);
    setInboxIdeas(remainingIdeas);
  };

  const handleAddSubTask = (taskId, subTaskTitle) => {
    if (subTaskTitle === "") return;

    const updateTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          subTasks: [
            ...task.subTasks,
            {
              id: Date.now(),
              title: subTaskTitle,
              completed: false,
            },
          ],
        };
      }
      return task;
    });
    setTasks(updateTasks);
  };

  const toggleSubTaskDone = (taskId, subTaskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedSubTasks = task.subTasks.map((subTask) => {
          if (subTask.id === subTaskId) {
            return { ...subTask, completed: !subTask.completed };
          }
          return subTask;
        });
        return { ...task, subTasks: updatedSubTasks };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <MainLayout>
      {/* මේ පහළින් තියෙන ටික තමයි අර MainLayout එකේ 'children' විදිහට යන්නේ */}
      <div>
        <h2 className="text-3xl font-bold">Welcome to Dashboard! 🚀</h2>

        <div>
          <button onClick={() => setActiveTab("tasks")}>📋 My Tasks</button>
          <button onClick={() => setActiveTab("ideas")}>💡 Idea Inbox</button>
        </div>

        {activeTab === "tasks" && (
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
                  <h3 className="text-lg font-semibold text-gray-600">
                    All done!
                  </h3>
                  <p className="text-gray-600">
                    You have completed all your tasks for today!, take some
                    rest.
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
                  />
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "ideas" && (
          <IdeaInbox
            newIdeaTitle={newIdeaTitle}
            setNewIdeaTitle={setNewIdeaTitle}
            handleAddIdea={handleAddIdea}
            inboxIdeas={inboxIdeas}
            handlePlanIdea={handlePlanIdea}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default App;
