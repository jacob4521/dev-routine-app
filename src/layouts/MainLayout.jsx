import {
  HomeIcon,
  LayoutGridIcon,
  Calendar1Icon,
  UsersIcon,
  BellIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col justify-between w-16 h-screen bg-surface-backdrop">
        <div className="flex flex-col pt-6 gap-9 items-center w-full">
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

        <div className="flex flex-col pb-6 gap-9 items-center w-full ">
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

      <aside></aside>

      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
