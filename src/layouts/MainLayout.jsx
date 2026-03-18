import React from 'react';

const MainLayout = ({ children }) => {
  return (
    // මුළු තිරයම ආවරණය වෙන ප්‍රධාන කොටුව (h-screen කියන්නේ තිරයේ උස)
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* වම් පැත්තේ Sidebar එක */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">DevRoutine AI</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            <li className="p-3 bg-blue-50 text-blue-700 rounded-lg cursor-pointer font-medium">Dashboard</li>
            <li className="p-3 hover:bg-gray-50 text-gray-700 rounded-lg cursor-pointer font-medium">Tasks</li>
            <li className="p-3 hover:bg-gray-50 text-gray-700 rounded-lg cursor-pointer font-medium">Routines</li>
          </ul>
        </nav>
      </aside>

      {/* දකුණු පැත්තේ ප්‍රධාන කොටස */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* මේ children කියන තැනට තමයි අපි දාන අනිත් පිටු වැටෙන්නේ */}
        {children}
      </main>
    </div>
  );
};

export default MainLayout;