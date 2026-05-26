import { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Loader2,
  Pin,
  PinOff,
  Sparkles,
  Trash2,
} from "lucide-react";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='675' viewBox='0 0 1200 675'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23dbeafe'/%3E%3Cstop offset='100%25' stop-color='%23eff6ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='675' rx='48' fill='url(%23g)'/%3E%3Cpath d='M480 270h240v160H480z' fill='none' stroke='%233b82f6' stroke-width='16' stroke-linejoin='round'/%3E%3Cpath d='M520 410l62-70 56 52 42-34 60 52' fill='none' stroke='%233b82f6' stroke-width='16' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='560' cy='325' r='18' fill='%233b82f6'/%3E%3Ctext x='600' y='500' text-anchor='middle' fill='%230f172a' font-family='Arial, sans-serif' font-size='34' font-weight='700'%3ELink Preview%3C/text%3E%3C/svg%3E";

const ResourceLibrary = ({
  resources,
  onAddResource,
  onDeleteResource,
  onToggleResource,
  onTogglePin,
  isFetching,
}) => {
  const [url, setUrl] = useState("");

  const sortedResources = [...resources].sort((a, b) => {
    const timeA = new Date(a.createdAt || a.id).getTime();
    const timeB = new Date(b.createdAt || b.id).getTime();
    return timeA - timeB;
  });

  const pinnedResources = sortedResources.filter((resource) => resource.isPinned);
  const regularResources = sortedResources.filter((resource) => !resource.isPinned);
  const completedCount = sortedResources.filter((resource) => resource.isCompleted).length;
  const pendingCount = sortedResources.length - completedCount;

  // Group resources by date (yyyy-mm-dd) and split by completion status
  const groupedByDate = regularResources.reduce((acc, resource) => {
    const dateKey = resource.createdAt
      ? new Date(resource.createdAt).toISOString().slice(0, 10)
      : new Date(resource.id).toISOString().slice(0, 10);

    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(resource);
    return acc;
  }, {});

  const dateGroups = Object.keys(groupedByDate)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map((key) => {
      const items = groupedByDate[key];
      const notDone = items.filter((r) => !r.isCompleted);
      const done = items.filter((r) => r.isCompleted);
      const dateLabel = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(key));

      return { key, dateLabel, notDone, done };
    });

  const formatAddedTime = (createdAt) => {
    if (!createdAt) return "Added: Unknown";

    const date = new Date(createdAt);

    if (Number.isNaN(date.getTime())) {
      return "Added: Unknown";
    }

    return `Added: ${new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date)}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedUrl = url.trim();
    if (!trimmedUrl) return;

    await onAddResource(trimmedUrl);
    setUrl("");
  };

  const renderResourceCard = (resource) => {
    const title = resource.title || "Saved Link";
    const description = resource.description || "Preview unavailable.";
    const imageSrc = resource.image || PLACEHOLDER_IMAGE;
    const isCompleted = Boolean(resource.isCompleted);
    const isPinned = Boolean(resource.isPinned);

    return (
      <article
        key={resource.id}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
      >
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block flex-1"
        >
          <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
            <img
              src={imageSrc}
              alt={title}
              className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${isCompleted ? "opacity-60 grayscale" : ""}`}
              onError={(event) => {
                event.currentTarget.src = PLACEHOLDER_IMAGE;
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/45 to-transparent" />
          </div>

          <div className="space-y-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <h3
                className={`text-lg font-bold text-gray-900 ${isCompleted ? "line-through decoration-2 decoration-gray-400/80" : ""}`}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {title}
              </h3>

              {isPinned && (
                <span className="inline-flex shrink-0 items-center rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                  Pinned
                </span>
              )}
            </div>

            <p
              className="text-sm leading-6 text-gray-500"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </p>

            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
              {formatAddedTime(resource.createdAt)}
            </p>
          </div>
        </a>

        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-gray-100 px-4 py-4">
          <button
            type="button"
            onClick={() => onTogglePin(resource.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${isPinned ? "bg-amber-100 text-amber-700 hover:bg-amber-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            aria-label={`${isPinned ? "Unpin" : "Pin"} ${title}`}
          >
            {isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
            {isPinned ? "Unpin" : "Pin"}
          </button>

          <button
            type="button"
            onClick={() => onToggleResource(resource.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${isCompleted ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            aria-label={`${isCompleted ? "Mark" : "Mark"} ${title} as ${isCompleted ? "not completed" : "completed"}`}
          >
            <CheckCircle2 className="h-4 w-4" />
            {isCompleted ? "Done" : "Mark Done"}
          </button>

          <button
            type="button"
            onClick={() => onDeleteResource(resource.id)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm ring-1 ring-inset ring-gray-200 transition hover:bg-red-50 hover:text-red-600"
            aria-label={`Delete ${title}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </article>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-6 space-y-6">
      <section className="overflow-hidden rounded-4xl border border-slate-200 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
        <div className="flex flex-col gap-6 p-6 md:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/75">
              <Sparkles className="h-3.5 w-3.5" />
              Resource Library
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                Keep your best links close and easy to return to.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 md:text-base">
                Save articles, videos, and references, pin long-term items to the top,
                and quickly see what still needs attention.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 font-medium text-white/90">
                <Pin className="h-4 w-4" />
                {pinnedResources.length} pinned
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 font-medium text-white/90">
                <CheckCircle2 className="h-4 w-4" />
                {completedCount} watched
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 font-medium text-white/90">
                <Clock3 className="h-4 w-4" />
                {pendingCount} to watch
              </span>
            </div>
          </div>

          <div className="grid w-full gap-3 md:grid-cols-3 lg:max-w-xl">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">Saved</p>
              <p className="mt-1 text-2xl font-bold text-white">{sortedResources.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">Pinned</p>
              <p className="mt-1 text-2xl font-bold text-white">{pinnedResources.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">Pending</p>
              <p className="mt-1 text-2xl font-bold text-white">{pendingCount}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-white/5 p-6 md:p-8">
          <form className="flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit}>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste a YouTube video or article URL"
              disabled={isFetching}
              className="flex-1 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-sky-400 focus:bg-slate-950/60 focus:ring-4 focus:ring-sky-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={isFetching || !url.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-black/10 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isFetching ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Fetching Preview...
                </>
              ) : (
                "Add Link"
              )}
            </button>
          </form>
        </div>
      </section>

      <section>
        {sortedResources.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white px-6 py-16 text-center text-gray-500 shadow-sm">
            <p className="text-4xl mb-3">📚</p>
            <p className="font-semibold text-gray-700">No resources saved yet.</p>
            <p className="mt-1 text-sm">
              Add a link above to build your personal reference library.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {pinnedResources.length > 0 && (
              <section className="overflow-hidden rounded-[1.75rem] border border-amber-100 bg-amber-50/60 shadow-sm">
                <div className="flex items-start justify-between gap-4 border-b border-amber-100 px-4 py-4 md:px-5">
                  <div>
                    <h4 className="text-sm font-semibold text-amber-800">Pinned Links</h4>
                    <p className="mt-1 text-xs text-amber-900/70">
                    Long-term links stay here at the top.
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                    {pinnedResources.length} items
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 md:p-5">
                  {pinnedResources.map((resource) => renderResourceCard(resource))}
                </div>
              </section>
            )}

            {dateGroups.map(({ key, dateLabel, notDone, done }) => (
              <section key={key} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 md:px-5">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700">{dateLabel}</h4>
                    <p className="mt-1 text-xs text-slate-500">
                      {notDone.length + done.length} saved resource{notDone.length + done.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {notDone.length} open · {done.length} watched
                  </span>
                </div>

                {notDone.length > 0 && (
                  <div className="grid grid-cols-1 gap-6 p-4 pt-5 md:grid-cols-2 lg:grid-cols-3 md:p-5">
                    {notDone.map((resource) => renderResourceCard(resource))}
                  </div>
                )}

                {done.length > 0 && (
                  <div className="border-t border-slate-100 bg-slate-50/60 px-4 pb-5 pt-4 md:px-5">
                    <h5 className="mb-3 text-sm font-medium text-slate-500">Watched</h5>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {done.map((resource) => renderResourceCard(resource))}
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ResourceLibrary;