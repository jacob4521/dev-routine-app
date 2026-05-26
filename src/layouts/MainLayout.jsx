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

      <main className="overflow-y-auto flex-1 bg-gray-50 px-6 pb-6 md:px-8 md:pb-8">
        <div className="sticky top-0 z-30 -mx-6 mb-4 border-b border-slate-800 bg-slate-950/95 px-4 py-2 shadow-lg shadow-slate-900/20 backdrop-blur md:-mx-8">
          {runningTask ? (
            <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-white/10 bg-linear-to-r from-slate-900 to-slate-800 px-3 py-2 text-white ring-1 ring-white/5">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-300 ring-1 ring-orange-400/20">
                <Play className="h-3.5 w-3.5" />
              </span>

              <div className="min-w-0 flex-1 overflow-hidden">
                <div className="marquee-track text-sm font-semibold text-white">
                  <span>{runningTask.title}</span>
                  <span className="mx-8 text-slate-500">•</span>
                  <span>{runningTask.title}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenTasks?.(runningTask.id)}
                className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                Open tasks
              </button>
            </div>
          ) : (
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl border border-dashed border-white/10 bg-slate-900/80 px-3 py-2 text-white ring-1 ring-white/5">
              <p className="truncate text-sm font-semibold text-white">
                No active task
              </p>
              <button
                type="button"
                onClick={() => onOpenTasks?.()}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/15"
              >
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
