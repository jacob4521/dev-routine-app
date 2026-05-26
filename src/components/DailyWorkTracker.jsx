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
    <div className="mx-auto mt-8 max-w-6xl space-y-6 lg:grid lg:grid-cols-[360px_1fr] lg:gap-6 lg:space-y-0">
      <section className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
        <div className="mb-6 rounded-2xl bg-slate-950 px-4 py-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
            Daily Work Tracker
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight">Log your work</h2>
          <p className="mt-2 text-sm text-slate-300">
            Capture what you finished today and keep a running history.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Finished Auth API"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/15"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Implemented JWT and tested with Postman"
              rows={5}
              className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/15"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Time Spent
            </label>
            <input
              type="text"
              value={timeSpent}
              onChange={(e) => setTimeSpent(e.target.value)}
              placeholder="2 hours 30 mins"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/15"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Log Work
          </button>
        </form>
      </section>

      <section className="min-h-130 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              History
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">Work logs</h3>
          </div>
          <p className="text-sm text-slate-500">{filteredLogs.length} entries</p>
        </div>

        <div className="mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Filter by Date
              </p>
              <h4 className="mt-1 text-sm font-semibold text-slate-700">
                View logs from a specific day
              </h4>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/15"
              />

              <button
                type="button"
                onClick={() => setFilterDate("")}
                disabled={!filterDate}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear Filter
              </button>
            </div>
          </div>
        </div>

        {dailyLogs.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center text-slate-500">
            <p className="text-3xl mb-3">📝</p>
            <p className="font-semibold text-slate-700">No daily logs yet.</p>
            <p className="text-sm mt-1">Add your first work log on the left.</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center text-slate-500">
            <p className="text-3xl mb-3">🔎</p>
            <p className="font-semibold text-slate-700">No logs found for this date.</p>
            <p className="text-sm mt-1">Try another date or clear the filter.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDates.map((date) => (
              <div key={date} className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                    {date}
                  </span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="space-y-3">
                  {groupedLogs[date].map((log) => (
                    <article
                      key={log.id}
                      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h4 className="text-lg font-semibold text-slate-900">
                            {log.title}
                          </h4>
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                            {log.description || "No description added."}
                          </p>
                          <div className="mt-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                            {log.timeSpent || "Time not specified"}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onDeleteLog(log.id)}
                          className="shrink-0 rounded-full p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
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