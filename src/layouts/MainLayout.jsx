import {
  HomeIcon,
  ClockIcon,
  Inbox,
  Play,
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
        <div className="flex h-screen w-56 flex-col border-r border-slate-200 bg-white px-4 py-5">
          <div className="mb-6 flex items-center gap-3 px-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
              <HomeIcon size={18} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Dev Routine
              </p>
              <p className="truncate text-sm font-bold text-slate-900">Workspace</p>
            </div>
          </div>

          <div className="space-y-2">
            <SectionLabel label="Core" />
            <NavItem
              icon={<HomeIcon size={18} />}
              label="Dashboard"
              isActive={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <NavItem
              icon={<ClockIcon size={18} />}
              label="Tasks"
              onClick={() => setActiveTab("tasks")}
            />
            <NavItem
              icon={<Inbox size={18} />}
              label="Inbox"
              onClick={() => setActiveTab("ideas")}
            />

            <div className="pt-4">
              <SectionLabel label="Workspace" />
              <div className="mt-2 space-y-1.5">
                <NavItem label="Brain Dumps" onClick={() => setActiveTab("brain-dumps")} />
                <NavItem label="Daily Log" onClick={() => setActiveTab("logs")} />
                <NavItem label="Resources" onClick={() => setActiveTab("resources")} />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="overflow-y-auto flex-1 bg-gray-50 px-6 pb-6 md:px-8 md:pb-8">
        <div className="sticky top-0 z-30 -mx-6 mb-4 border-b border-slate-800 bg-slate-950/95 px-4 py-2 shadow-lg shadow-slate-900/20 backdrop-blur md:-mx-8">
          {runningTask ? (
            <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-2xl border border-white/10 bg-linear-to-r from-slate-900 to-slate-800 px-2.5 py-1.5 text-white ring-1 ring-white/5">
              <div className="min-w-0 flex-1 overflow-hidden rounded-xl bg-white/5 px-3 py-1">
                <div className="marquee-track text-xs font-semibold text-white sm:text-sm">
                  <span>{runningTask.title}</span>
                  <span className="mx-6 text-slate-500">•</span>
                  <span>{runningTask.title}</span>
                </div>
              </div>

              <span className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold font-mono text-white">
                {formatTime(runningTask.timeSpent)}
              </span>

              <button
                type="button"
                onClick={() => onOpenTasks?.(runningTask.id)}
                className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-white/10"
              >
                Open tasks
              </button>
            </div>
          ) : (
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-2 rounded-2xl border border-dashed border-white/10 bg-slate-900/80 px-2.5 py-1.5 text-white ring-1 ring-white/5">
              <p className="truncate text-xs font-semibold text-white sm:text-sm">
                No active task
              </p>
              <button
                type="button"
                onClick={() => onOpenTasks?.()}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-white/15"
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
      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left font-semibold transition ${isActive ? "bg-slate-950 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
    >
      {icon ? (
        <span className={isActive ? "text-white" : "text-slate-400"}>{icon}</span>
      ) : (
        <span className="h-2 w-2 shrink-0 rounded-full bg-slate-300" />
      )}
      <span className="text-sm">{label}</span>
    </button>
  );
}

function SectionLabel({ label }) {
  return (
    <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
      {label}
    </p>
  );
}
