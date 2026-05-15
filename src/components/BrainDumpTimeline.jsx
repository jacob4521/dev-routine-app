import React from "react";

function BrainDumpTimeline({ brainDumps, tasks }) {
  if (!brainDumps || brainDumps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-400">
        <svg
          className="w-16 h-16 mb-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <p className="text-lg font-medium">No mind clears yet.</p>
        <p className="text-sm mt-1">
          Your brain dumps will appear here when you clear your mind before a task.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Timeline</h2>
      <div className="relative border-l-2 border-gray-200 ml-3">
        {brainDumps.map((dump) => {
          const relatedTask = tasks.find((t) => t.id === dump.taskId);

          return (
            <div key={dump.id} className="mb-8 pl-8 relative">
              {/* Timeline Dot */}
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1 border-4 border-white shadow-sm" />

              {/* Time */}
              <div className="text-xs font-semibold text-gray-500 mb-1">
                {dump.time}
              </div>

              {/* Card */}
              <div className="bg-gray-50 rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {dump.title}
                </h3>
                {dump.description && (
                  <p className="text-gray-600 mb-4 whitespace-pre-wrap text-sm leading-relaxed">
                    {dump.description}
                  </p>
                )}

                {/* Related Task Badge */}
                {relatedTask && (
                  <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mt-2">
                    <svg
                      className="w-3.5 h-3.5 mr-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    While working on: {relatedTask.title}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BrainDumpTimeline;