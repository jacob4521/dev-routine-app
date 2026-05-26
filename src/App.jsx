import { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";
import MainLayout from "./layouts/MainLayout";
import IdeaInbox from "./components/IdeaInbox";
import TaskBoard from "./components/TaskBoard";
import PomodoroTimer from "./components/PomodoroTimer";
import SidebarPreview from "./components/SidebarPreview";
import TaskPractice from "./components/TaskPractice";
import BrainDumpModal from "./components/BrainDumpModal";
import BrainDumpTimeline from "./components/BrainDumpTimeline";
import DailyWorkTracker from "./components/DailyWorkTracker";
import ResourceLibrary from "./components/ResourceLibrary";

function App() {
  const [runningTaskId, setRunningTaskId] = useState(null);
  const [isBrainDumpModalOpen, setIsBrainDumpModalOpen] = useState(false);
  
  const [brainDumps, setBrainDumps] = useState(() => {
    const savedDumps = localStorage.getItem("dev-braindumps");
    return savedDumps ? JSON.parse(savedDumps) : [];
  });

  const [dailyLogs, setDailyLogs] = useState(() => {
    const saved = localStorage.getItem("dev-daily-logs");
    return saved ? JSON.parse(saved) : [];
  });

  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem("dev-resources");
    return saved ? JSON.parse(saved) : [];
  });

  const [pendingTaskId, setPendingTaskId] = useState(null);

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
  const [isFetchingLink, setIsFetchingLink] = useState(false);

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
    localStorage.setItem("dev-braindumps", JSON.stringify(brainDumps));
  }, [brainDumps]);

  useEffect(() => {
    localStorage.setItem("dev-daily-logs", JSON.stringify(dailyLogs));
  }, [dailyLogs]);

  useEffect(() => {
    localStorage.setItem("dev-resources", JSON.stringify(resources));
  }, [resources]);

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

  const handleAddDailyLog = (title, description, timeSpent) => {
    if (title.trim() === "") return;

    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      title,
      description,
      timeSpent,
    };

    setDailyLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  const handleDeleteDailyLog = (id) => {
    setDailyLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
  };

  const handleAddResource = async (url) => {
    if (url.trim() === "") return;

    setIsFetchingLink(true);

    try {
      const response = await fetch(
        `https://api.linkpreview.net/?key=2b751a712eb446f6f3522a9106540911&q=${encodeURIComponent(url)}`,
      );
      const data = await response.json();

      const newResource = {
        id: Date.now(),
        url,
        title: data.title || "Saved Link",
        description: data.description || "",
        image: data.image || "",
        createdAt: new Date().toISOString(),
        isCompleted: false,
        isPinned: false,
      };

      setResources((prevResources) => [newResource, ...prevResources]);
    } catch {
      const fallbackResource = {
        id: Date.now(),
        url,
        title: "Saved Link",
        description: "Preview unavailable.",
        image: "",
        createdAt: new Date().toISOString(),
        isCompleted: false,
        isPinned: false,
      };

      setResources((prevResources) => [fallbackResource, ...prevResources]);
    } finally {
      setIsFetchingLink(false);
    }
  };

  const handleDeleteResource = (id) => {
    setResources((prevResources) =>
      prevResources.filter((resource) => resource.id !== id),
    );
  };

  const handleToggleResourceStatus = (id) => {
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === id
          ? { ...resource, isCompleted: !resource.isCompleted }
          : resource,
      ),
    );
  };

  const handleToggleResourcePin = (id) => {
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === id
          ? { ...resource, isPinned: !resource.isPinned }
          : resource,
      ),
    );
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
      setPendingTaskId(taskId);
      setIsBrainDumpModalOpen(true);
    }
  };

  const handleStartFocusSession = (title, description) => {
    const newBrainDump = {
      id: Date.now(),
      taskId: pendingTaskId,
      time: new Date().toLocaleTimeString(),
      title,
      description,
    };
    
    setBrainDumps((prev) => [...prev, newBrainDump]);
    setIsBrainDumpModalOpen(false);
    setRunningTaskId(pendingTaskId);
    setPendingTaskId(null);
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

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const totalResources = resources.length;
  const pinnedResources = resources.filter((resource) => resource.isPinned).length;
  const completedResources = resources.filter(
    (resource) => resource.isCompleted,
  ).length;
  const totalIdeas = inboxIdeas.length;
  const totalLogs = dailyLogs.length;

  const sortedTaskList = sortTaskPriorities(tasks);
  const urgentTasks = sortedTaskList.filter((task) => !task.completed).slice(0, 3);
  const runningTask = tasks.find((task) => task.id === runningTaskId);
  const nextTask = sortedTaskList.find((task) => !task.completed);
  const pinnedResourceList = resources.filter((resource) => resource.isPinned).slice(0, 3);
  const nextResource = resources.find((resource) => !resource.isCompleted);
  const latestLog = dailyLogs[0];
  const latestIdea = inboxIdeas[0];



  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          <section className="overflow-hidden rounded-4xl border border-slate-200 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
            <div className="flex flex-col gap-6 p-6 md:p-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
                  Dashboard
                </p>
                <div>
                  <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                    Your next important action, surfaced first.
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                    This landing area shows what needs attention now, what is currently running,
                    and what should stay visible every day. Stats live below so the page stays
                    reminder-first.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("tasks")}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                  >
                    Open Tasks
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("resources")}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    Open Resources
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("ideas")}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    Open Inbox
                  </button>
                </div>
              </div>

              <div className="grid w-full gap-3 sm:grid-cols-3 lg:max-w-xl">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/55">Open tasks</p>
                  <p className="mt-1 text-2xl font-bold">{activeTasks}</p>
                  <p className="mt-1 text-xs text-white/65">waiting to be done</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/55">Pinned</p>
                  <p className="mt-1 text-2xl font-bold">{pinnedResources}</p>
                  <p className="mt-1 text-xs text-white/65">long-term reminders</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/55">Focus</p>
                  <p className="mt-1 text-2xl font-bold">{completedTasks}/{totalTasks}</p>
                  <p className="mt-1 text-xs text-white/65">tasks completed</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <OverviewCard
                title="Tasks"
                value={`${completedTasks}/${totalTasks}`}
                note={`${activeTasks} still open`}
              />
              <OverviewCard
                title="Resources"
                value={totalResources}
                note={`${completedResources} marked done`}
              />
              <OverviewCard
                title="Ideas"
                value={totalIdeas}
                note="Captured in the inbox"
              />
              <OverviewCard
                title="Logs"
                value={totalLogs}
                note="Daily work entries"
              />
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
                        Do now
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-slate-900">Urgent tasks</h3>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
                      {urgentTasks.length} items
                    </span>
                  </div>

                  {runningTask ? (
                    <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                        Currently running
                      </p>
                      <p className="mt-1 font-semibold text-emerald-950">{runningTask.title}</p>
                      <p className="mt-1 text-sm text-emerald-800">Keep going. This is the active focus item.</p>
                    </div>
                  ) : nextTask ? (
                    <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Next task
                      </p>
                      <p className="mt-1 font-semibold text-slate-900">{nextTask.title}</p>
                      <p className="mt-1 text-sm text-slate-500">Start here if nothing is already running.</p>
                    </div>
                  ) : (
                    <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="font-semibold text-slate-900">No open tasks right now.</p>
                      <p className="mt-1 text-sm text-slate-500">Add work to keep the dashboard useful as a reminder surface.</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {urgentTasks.length > 0 ? (
                      urgentTasks.map((task, index) => (
                        <div
                          key={task.id}
                          className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3"
                        >
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                              Priority {index + 1}
                            </p>
                            <p className="mt-1 font-semibold text-slate-900">{task.title}</p>
                            <p className="mt-1 text-sm text-slate-500">{task.category} · {task.priority}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setActiveTab("tasks")}
                            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                          >
                            Open
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                        No urgent tasks are queued. Your dashboard is clear for now.
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Keep visible
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-slate-900">Pinned reminders</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("resources")}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                    >
                      Open resources
                    </button>
                  </div>

                  <div className="space-y-3">
                    {pinnedResourceList.length > 0 ? (
                      pinnedResourceList.map((resource) => (
                        <div
                          key={resource.id}
                          className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3"
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700">
                            Pinned reminder
                          </p>
                          <p className="mt-1 font-semibold text-amber-950">{resource.title || "Saved Link"}</p>
                          <p className="mt-1 line-clamp-2 text-sm text-amber-900/75">
                            {resource.description || "Open this often enough to stay top of mind."}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                        Pin long-term resources here so they always stay on the landing page.
                      </div>
                    )}
                  </div>

                  <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                    <ActionRow
                      label="Latest log"
                      value={latestLog ? latestLog.title : "No logs yet"}
                      helper={latestLog ? latestLog.date : "Track your day as you work."}
                    />
                    <ActionRow
                      label="Latest idea"
                      value={latestIdea ? latestIdea.title : "No ideas captured"}
                      helper={latestIdea ? "Ready to be planned into tasks." : "Capture ideas before they vanish."}
                    />
                    <ActionRow
                      label="Resource status"
                      value={`${completedResources}/${totalResources} watched`}
                      helper={nextResource ? `Next to watch: ${nextResource.title}` : "All saved links have been consumed."}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Focus mode
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    Start a session and stay on track
                  </h3>
                </div>
                <PomodoroTimer />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <MiniPanel
                  title="Pinned resources"
                  value={pinnedResources}
                  note="Always surfaced first"
                  actionLabel="Open resources"
                  onAction={() => setActiveTab("resources")}
                />
                <MiniPanel
                  title="Inbox ideas"
                  value={totalIdeas}
                  note="Potential tasks waiting"
                  actionLabel="Open inbox"
                  onAction={() => setActiveTab("ideas")}
                />
                <MiniPanel
                  title="Daily logs"
                  value={totalLogs}
                  note="Work history you can review"
                  actionLabel="Open logs"
                  onAction={() => setActiveTab("logs")}
                />
                <MiniPanel
                  title="Open tasks"
                  value={activeTasks}
                  note="Ready for the next focus block"
                  actionLabel="Open tasks"
                  onAction={() => setActiveTab("tasks")}
                />
              </div>
            </div>
          </section>
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

          <button
            className={`px-5 py-2.5 font-semibold text-sm rounded-t-lg transition-all duration-200 ${activeTab === "brain-dumps" ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("brain-dumps")}
          >
            🧠 Brain Dumps
          </button>

          <button
            className={`px-5 py-2.5 font-semibold text-sm rounded-t-lg transition-all duration-200 ${activeTab === "logs" ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("logs")}
          >
            📝 Daily Log
          </button>

          <button
            className={`px-5 py-2.5 font-semibold text-sm rounded-t-lg transition-all duration-200 ${activeTab === "resources" ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("resources")}
          >
            📚 Resources
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

        {activeTab === "brain-dumps" && (
          <BrainDumpTimeline brainDumps={brainDumps} tasks={tasks} />
        )}

        {activeTab === "logs" && (
          <DailyWorkTracker
            dailyLogs={dailyLogs}
            onAddLog={handleAddDailyLog}
            onDeleteLog={handleDeleteDailyLog}
          />
        )}

        {activeTab === "resources" && (
          <ResourceLibrary
            resources={resources}
            onAddResource={handleAddResource}
            onDeleteResource={handleDeleteResource}
            onToggleResource={handleToggleResourceStatus}
            onTogglePin={handleToggleResourcePin}
            isFetching={isFetchingLink}
          />
        )}
      </div>

      <BrainDumpModal
        isOpen={isBrainDumpModalOpen}
        onClose={() => {
          setIsBrainDumpModalOpen(false);
          setPendingTaskId(null);
        }}
        onSubmit={handleStartFocusSession}
      />
    </MainLayout>
  );
}

export default App;

function OverviewCard({ title, value, note }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-black tracking-tight text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{note}</p>
    </div>
  );
}

function ActionRow({ label, value, helper }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-1 line-clamp-1 font-semibold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{helper}</p>
    </div>
  );
}

function MiniPanel({ title, value, note, actionLabel, onAction }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-black tracking-tight text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{note}</p>
      <button
        type="button"
        onClick={onAction}
        className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
      >
        {actionLabel}
      </button>
    </div>
  );
}
