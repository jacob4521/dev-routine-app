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
    let lastTick = Date.now();

    if (runningTaskId) {
      interval = setInterval(() => {
        const now = Date.now();
        const delta = Math.floor((now - lastTick) / 1000);

        if (delta > 0) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === runningTaskId
                ? { ...task, timeSpent: (task.timeSpent || 0) + delta }
                : task,
            ),
          );
          lastTick += delta * 1000;
        }
      }, 1000);
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
      priority: "Low",
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

  const handleAddLink = (taskId, linkUrl) => {
    if (linkUrl.trim() === "") return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, links: [...(task.links || []), linkUrl] }
          : task,
      ),
    );
  };

  const handleRemoveLink = (taskId, linkIndexToRemove) => {
    setTasks((prevTask) =>
      prevTask.map((task) =>
        task.id === taskId
          ? {
              ...task,
              links: (task.links || []).filter(
                (_, index) => index !== linkIndexToRemove,
              ),
            }
          : task,
      ),
    );
  };

  const downloadTasksBackup = () => {
    const savedTasks = localStorage.getItem("dev-tasks");

    const jasonString = JSON.stringify(savedTasks, null, 2);

    const blob = new Blob([jasonString], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "my-tasks.json";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // create a funciton to sort the tasks based on their priority
  const sortTaskPriorities = (tasksArray) => {
    const prioritWeights = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    // creating a new sorted array
    const sortedArray = [...tasksArray].sort((a, b) => {
      // Creating the weights for the priorities of the tasks
      const weightA = prioritWeights[a.priority];
      const weightB = prioritWeights[b.priority];

      // Sorting the tasks based on the weights of their priorities\
      if (weightA !== weightB) {
        // If the weight of a and b is not equal sort them based on the weights
        return weightB - weightA;
      } else {
        // If weights are equal sort thme based on their created time using ID
        return a.id - b.id;
      }
    });
    return sortedArray;
  };

  // Function to change the priority of a task
  const changeTaskPriority = (taskID, newPriority) => {
    // map through the tasks
    const updatedTasks = tasks.map((task) => {
      // Compare the taskID and find the task
      if (task.id === taskID) {
        // Create a new object and return it
        return { ...task, priority: newPriority };
      }
      return task;
    });

    // Set the tasks state
    setTasks(updatedTasks);
  };

  // Function to handle priority change of task
  const handlePriorityChange = (taskID) => {
    // Mapping a priority cycle
    const nextPriority = {
      Low: "Medium",
      Medium: "High",
      High: "Low",
    };

    // Map throught the tasks list and find the task and create the updaetd tasks array
    const updatedTasks = tasks.map((task) => {
      // If the task id is matched return the updated task object
      if (task.id === taskID) {
        return { ...task, priority: nextPriority[task.priority] };
      }
      // If the task id is not matched return the task object as it is
      return task;
    });

    // Set the tasks state with the updated tasks array
    setTasks(updatedTasks);
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
            tasks={sortTaskPriorities(tasks)}
            deleteTask={deleteTask}
            updateTask={updateTask}
            toggleTaskDone={toggleTaskDone}
            categoryColors={categoryColors}
            handleAddSubTask={handleAddSubTask}
            runningTaskId={runningTaskId}
            toggleTimer={toggleTimer}
            handleAddLink={handleAddLink}
            handleRemoveLink={handleRemoveLink}
            downloadTasksBackup={downloadTasksBackup}
            handlePriorityChange={handlePriorityChange}
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
