import { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";
import MainLayout from "./layouts/MainLayout";
import IdeaInbox from "./components/IdeaInbox";
import TaskBoard from "./components/TaskBoard";
import PomodoroTimer from "./components/PomodoroTimer";
import SidebarPreview from "./components/SidebarPreview";
import TaskPractice from "./components/TaskPractice";

function App() {
  const [runningTaskId, setRunningTaskId] = useState(null);

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

  const [activeTab, setActiveTab] = useState("dashboard");

  const [newTaskCategory, setNewTaskCategory] = useState("Work");

  const [planningIdeaId, setPlanningIdeaId] = useState(null);

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

    useEffect(() => {
      let interval;

      if (runningTaskId) {
        interval = setInterval(() => {
          setTasks(
            (prevTasks) =>
              prevTasks.map((task) =>
                task.id === runningTaskId
                  ? { ...task, timeSpent: (task.timeSpent || 0) + 1 }
                  : task,
              ),
            1000,
          );
        });
      } else {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }, [runningTaskId]);

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      category: newTaskCategory,
      completed: false,
      parentId: null,
    };

    setTasks([newTask, ...tasks]);

    if (planningIdeaId) {
      const remaingIdeas = inboxIdeas.filter(
        (idea) => idea.id !== planningIdeaId,
      );
      setInboxIdeas(remaingIdeas);
      setPlanningIdeaId(null);
    }

    setNewTaskTitle("");
    setNewTaskCategory("Work");
  };

  const deleteTask = (taskID) => {
    let taskCompleted;
    tasks.map((task) =>
      task.id === taskID ? (taskCompleted = task.completed) : null,
    );
    console.log(taskCompleted);

    if (taskCompleted === false) {
      const remainingTasks = tasks.filter((task) => task.id !== taskID);
      setTasks(remainingTasks);
    }
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
    setPlanningIdeaId(idea.id);
  };

  const deleteIdea = (ideaId) => {
    const remainingIdeas = inboxIdeas.filter((idea) => idea.id !== ideaId);
    setInboxIdeas(remainingIdeas);
  };

  const handleAddSubTask = (taskId, subTaskTitle, taskCategory) => {
    if (subTaskTitle.trim() === "") return;

    const newSubTask = {
      id: Date.now(),
      title: subTaskTitle,
      category: taskCategory,
      completed: false,
      parentId: taskId,
    };

    setTasks([...tasks, newSubTask]);
  };

  const toggleTimer = (taskId) => {
    if (runningTaskId === taskId) {
      setRunningTaskId(null);
    } else {
      setRunningTaskId(taskId);
    }
  };

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "dashboard" && (
        <div>
          <h2 className="text-3xl font-bold mb-6">Welcome to Dashboard! 🚀</h2>

          <PomodoroTimer />
        </div>
      )}

      {/* මේ පහළින් තියෙන ටික තමයි අර MainLayout එකේ 'children' විදිහට යන්නේ */}
      <div>
        <div>
          <button
            className={`px-5 py-2.5 font-semibold text-sm rounded-t-lg transition-all duration-200 ${activeTab === "tasks" ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("tasks")}
          >
            📋 My Tasks
          </button>

          <button
            className={`px-5 py-2.5 font-semibold text-sm rounded-t-lg transition-all duration-200 ${activeTab === "ideas" ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("ideas")}
          >
            💡 Idea Inbox
          </button>
        </div>
         
        {activeTab === "tasks" && (
          <TaskBoard
            newTaskTitle={newTaskTitle}
            setNewTaskTitle={setNewTaskTitle}
            newTaskCategory={newTaskCategory}
            setNewTaskCategory={setNewTaskCategory}
            handleAddTask={handleAddTask}
            tasks={tasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
            toggleTaskDone={toggleTaskDone}
            categoryColors={categoryColors}
            handleAddSubTask={handleAddSubTask}
            runningTaskId={runningTaskId}
            toggleTimer={toggleTimer}
          />
        )}
        {/* {activeTab === "tasks" && <TaskPractice />} */}

        {activeTab === "ideas" && (
          <IdeaInbox
            newIdeaTitle={newIdeaTitle}
            setNewIdeaTitle={setNewIdeaTitle}
            handleAddIdea={handleAddIdea}
            inboxIdeas={inboxIdeas}
            handlePlanIdea={handlePlanIdea}
            deleteIdea={deleteIdea}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default App;
