import {
  HomeIcon,
  LayoutGridIcon,
  Calendar1Icon,
  UsersIcon,
  BellIcon,
  SettingsIcon,
  LogOutIcon,
  CalendarDaysIcon,
  CalendarXIcon,
  ClockIcon,
  Inbox,
  BriefcaseIcon,
  UserIcon,
  ZapIcon,
  GlobeIcon,
  BookIcon,
  ChevronRight,
  CheckCircle2Icon,
  Trash2Icon,
  PieChartIcon,
  Play,
  Pause,
  TimerReset,
} from "lucide-react";

const MainLayout = ({
  children,
  activeTab,
  setActiveTab,
  runningTask,
  toggleTimer,
  onOpenTasks,
}) => {
  const formatTime = (totalSeconds) => {
    if (!totalSeconds) return "00:00:00";

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);

    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <aside className="flex h-full">
        {/* Left Sidebar */}
        <div className="flex flex-col justify-between w-18 pr-2 h-screen bg-surface-backdrop">
          <div className="flex flex-col pt-6 gap-9 items-center w-full pr-4">
            <button>
              <HomeIcon size={20} strokeWidth={1.5} />
            </button>
            <button>
              <LayoutGridIcon size={20} strokeWidth={1.5} />
            </button>
            <button>
              <Calendar1Icon size={20} strokeWidth={1.5} />
            </button>
            <button>
              <UsersIcon size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex flex-col pb-6 gap-9 items-center w-full -ml-1.5">
            <button>
              <BellIcon size={20} strokeWidth={1.5} />
            </button>
            <button>
              <SettingsIcon size={20} strokeWidth={1.5} />
            </button>
            <button>
              <LogOutIcon size={20} strokeWidth={1.5} className="rotate-180" />
            </button>
          </div>
        </div>

        {/* Main Sidebar */}
        <div className="w-50 no-scrollbar h-full pb-10 flex flex-col justify-between rounded-l-3xl -ml-5 bg-white">
          <div className="overflow-y-auto flex-1 no-scrollbar border-r border-gray-100">
            {/* Top Section */}
            <div className="flex flex-col gap-5 mt-8 px-6 w-full">
              <NavItem
                icon={<HomeIcon size={18} />}
                label="Dashboard"
                isActive={activeTab === "dashboard"}
                onClick={() => setActiveTab("dashboard")}
              />
              <NavItem
                icon={<CalendarDaysIcon size={18} />}
                label="Allday"
                onClick={() => setActiveTab("tasks")}
              />
              <NavItem
                icon={<ClockIcon size={18} />}
                label="Today"
                onClick={() => setActiveTab("tasks")}
              />
              <NavItem
                icon={<Calendar1Icon size={18} />}
                label="Tomorrow"
                onClick={() => setActiveTab("tasks")}
              />
              <NavItem
                icon={<CalendarXIcon size={18} />}
                label="Next 7 Days"
                onClick={() => setActiveTab("tasks")}
              />
              <NavItem
                icon={<Inbox size={18} />}
                label="Inbox"
                onClick={() => setActiveTab("ideas")}
              />
            </div>

            {/* Middle Section */}
            <div className="mt-14">
              <h2 className="uppercase text-xs mb-2 font-bold text-gray-400 ml-6">
                Lists
              </h2>
              <div className="flex flex-col gap-5 px-6 w-full">
                <NavItem icon={<BriefcaseIcon size={18} />} label="Work" />
                <NavItem icon={<UserIcon size={18} />} label="Freelance" />
                <NavItem icon={<ZapIcon size={18} />} label="Workout" />
                <NavItem icon={<GlobeIcon size={18} />} label="Learning" />
                <NavItem icon={<BookIcon size={18} />} label="Reading" />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col mt-14 mb-12">
              <h2 className="uppercase text-xs mb-2 font-bold text-gray-400 ml-6 pb-2">
                Tags
              </h2>
              <div className="flex flex-col gap-5">
                <TagItem label="Important" color="text-gray-500" />
                <TagItem label="Work" color="text-blue-500" />
                <TagItem label="Personal" color="text-pink-500" />
                <TagItem label="Coding" color="text-orange-400" />
                <TagItem label="Studdy" color="text-emerald-500" />
              </div>
            </div>
          </div>

          <div className="p-2 flex flex-col gap-6 border-t border-gray-100 pt-7">
            <NavItem
              icon={<CheckCircle2Icon size={18} />}
              label="Completed"
              onClick={() => setActiveTab("tasks")}
            />
            <NavItem
              icon={<Trash2Icon size={18} />}
              label="Trash"
              onClick={() => setActiveTab("tasks")}
            />
            <NavItem
              icon={<PieChartIcon size={18} />}
              label="Dashboard"
              isActive={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
          </div>
        </div>
      </aside>

      <main className="overflow-y-auto flex-1 bg-gray-50 p-6 md:p-8">
        <div className="sticky top-0 z-30 mb-6 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
          {runningTask ? (
            <div className="flex items-center gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto no-scrollbar">
                <span className="inline-flex shrink-0 items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">
                  Running now
                </span>
                <div className="min-w-0 overflow-x-auto no-scrollbar whitespace-nowrap">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Currently focused task
                  </p>
                  <h3 className="mt-0.5 text-sm font-bold text-slate-900">
                    {runningTask.title}
                  </h3>
                </div>
                <div className="ml-auto hidden shrink-0 items-center gap-2 md:flex">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {runningTask.category || "Task"}
                  </span>
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                    {runningTask.priority || "No Priority"}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs font-semibold text-slate-700">
                    {formatTime(runningTask.timeSpent)}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenTasks?.(runningTask.id)}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  Open task
                </button>
                <button
                  type="button"
                  onClick={() => toggleTimer(runningTask.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-700"
                >
                  <Pause className="h-3.5 w-3.5" />
                  Stop
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  No active task
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Start a task to keep the running bar visible on every page.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenTasks?.()}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
              >
                <Play className="h-3.5 w-3.5" />
                Open tasks
              </button>
            </div>
          )}
        </div>

        {children}
      </main>
    </div>
  );
};

export default MainLayout;

function NavItem({ icon, label, onClick, isActive }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex gap-4 font-bold transition ${isActive ? "text-slate-900" : "text-gray-500 hover:text-gray-900"}`}
    >
      <span>{icon}</span>
      <span className="text-sm ">{label}</span>
    </button>
  );
}

function TagItem({ color, label }) {
  return (
    <button className="flex gap-4 items-center ml-6 text-gray-500 font-bold">
      <ChevronRight size={16} strokeWidth={3} className={`${color} `} />
      <span className="text-sm">{label}</span>
    </button>
  );
}
