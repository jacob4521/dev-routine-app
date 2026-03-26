import React from "react";

const MainLayout = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };
  return (
    // මුළු තිරයම ආවරණය වෙන ප්‍රධාන කොටුව (h-screen කියන්නේ තිරයේ උස)
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      <div className="md:hidden absolute top-0 w-full z-20 flex items-center justify-between p-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">DevRoutine AI</h1>
        <button
          className="text-2xl text-gray-600 cursor-pointer"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          {isSidebarOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* වම් පැත්තේ Sidebar එක */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">DevRoutine AI</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            <li
              onClick={() => handleNavClick("dashboard")}
              className={`p-3 rounded-lg cursor-pointer font-medium transition-colors ${activeTab === "dashboard" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
            >
              Dashboard
            </li>
            <li
              onClick={() => handleNavClick("tasks")}
              className={`p-3 rounded-lg cursor-pointer font-medium transition-colors ${activeTab === "tasks" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
            >
              Tasks
            </li>
            <li
              onClick={() => handleNavClick("ideas")}
              className={`p-3 rounded-lg cursor-pointer font-medium transition-colors ${activeTab === "ideas" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
            >
              Ideas
            </li>
          </ul>
        </nav>
      </aside>

      {/* දකුණු පැත්තේ ප්‍රධාන කොටස */}
      <main className=" pt-20 flex-1 p-8 overflow-y-auto">
        {/* මේ children කියන තැනට තමයි අපි දාන අනිත් පිටු වැටෙන්නේ */}
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
