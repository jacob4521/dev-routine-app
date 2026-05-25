import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

const DailyWorkTracker = ({ dailyLogs, onAddLog, onDeleteLog }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filteredLogs = useMemo(() => {
    if (!filterDate) {
      return dailyLogs;
    }

    const formattedFilterDate = new Date(filterDate).toLocaleDateString();
    return dailyLogs.filter((log) => log.date === formattedFilterDate);
  }, [dailyLogs, filterDate]);

  const groupedLogs = useMemo(() => {
    return filteredLogs.reduce((groups, log) => {
      if (!groups[log.date]) {
        groups[log.date] = [];
      }

      groups[log.date].push(log);
      return groups;
    }, {});
  }, [filteredLogs]);

  const sortedDates = useMemo(() => Object.keys(groupedLogs), [groupedLogs]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    onAddLog(title.trim(), description.trim(), timeSpent.trim());
    setTitle("");
    setDescription("");
    setTimeSpent("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
      <section className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 h-fit sticky top-6">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Daily Work Tracker
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">Log your work</h2>
          <p className="text-sm text-gray-500 mt-2">
            Capture what you finished today and keep a running history.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Finished Auth API"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Implemented JWT and tested with Postman"
              rows={5}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Time Spent
            </label>
            <input
              type="text"
              value={timeSpent}
              onChange={(e) => setTimeSpent(e.target.value)}
              placeholder="2 hours 30 mins"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Log Work
          </button>
        </form>
      </section>

      <section className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 min-h-130">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              History
            </p>
            <h3 className="text-xl font-bold text-gray-900">Work logs</h3>
          </div>
          <p className="text-sm text-gray-500">{filteredLogs.length} entries</p>
        </div>

        <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Filter by Date
              </p>
              <h4 className="mt-1 text-sm font-semibold text-gray-700">
                View logs from a specific day
              </h4>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => setFilterDate("")}
                disabled={!filterDate}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear Filter
              </button>
            </div>
          </div>
        </div>

        {dailyLogs.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center text-gray-500">
            <p className="text-3xl mb-3">📝</p>
            <p className="font-medium">No daily logs yet.</p>
            <p className="text-sm mt-1">Add your first work log on the left.</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center text-gray-500">
            <p className="text-3xl mb-3">🔎</p>
            <p className="font-medium">No logs found for this date.</p>
            <p className="text-sm mt-1">Try another date or clear the filter.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDates.map((date) => (
              <div key={date} className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold uppercase tracking-wider text-gray-400">
                    {date}
                  </span>
                  <span className="h-px flex-1 bg-gray-100" />
                </div>

                <div className="space-y-3">
                  {groupedLogs[date].map((log) => (
                    <article
                      key={log.id}
                      className="rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {log.title}
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600 whitespace-pre-wrap">
                            {log.description || "No description added."}
                          </p>
                          <div className="mt-4 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 border border-gray-200">
                            {log.timeSpent || "Time not specified"}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onDeleteLog(log.id)}
                          className="shrink-0 rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          aria-label={`Delete log ${log.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DailyWorkTracker;