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
} from "lucide-react";

const MainLayout = ({ children }) => {
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
              <NavItem icon={<CalendarDaysIcon size={18} />} label="Allday" />
              <NavItem icon={<ClockIcon size={18} />} label="Today" />
              <NavItem icon={<Calendar1Icon size={18} />} label="Tomorrow" />
              <NavItem icon={<CalendarXIcon size={18} />} label="Next 7 Days" />
              <NavItem icon={<Inbox size={18} />} label="Inbox" />
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
            <NavItem icon={<CheckCircle2Icon size={18} />} label="Completed" />
            <NavItem icon={<Trash2Icon size={18} />} label="Trash" />
            <NavItem icon={<PieChartIcon size={18} />} label="Summary" />
          </div>
        </div>
      </aside>

      <main className="overflow-y-auto flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
};

export default MainLayout;

function NavItem({ icon, label }) {
  return (
    <button className="flex gap-4 text-gray-500 font-bold">
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
