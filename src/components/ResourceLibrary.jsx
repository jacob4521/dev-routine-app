import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='675' viewBox='0 0 1200 675'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23dbeafe'/%3E%3Cstop offset='100%25' stop-color='%23eff6ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='675' rx='48' fill='url(%23g)'/%3E%3Cpath d='M480 270h240v160H480z' fill='none' stroke='%233b82f6' stroke-width='16' stroke-linejoin='round'/%3E%3Cpath d='M520 410l62-70 56 52 42-34 60 52' fill='none' stroke='%233b82f6' stroke-width='16' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='560' cy='325' r='18' fill='%233b82f6'/%3E%3Ctext x='600' y='500' text-anchor='middle' fill='%230f172a' font-family='Arial, sans-serif' font-size='34' font-weight='700'%3ELink Preview%3C/text%3E%3C/svg%3E";

const ResourceLibrary = ({
  resources,
  onAddResource,
  onDeleteResource,
  isFetching,
}) => {
  const [url, setUrl] = useState("");

  const sortedResources = [...resources].sort((a, b) => {
    const timeA = new Date(a.createdAt || a.id).getTime();
    const timeB = new Date(b.createdAt || b.id).getTime();
    return timeA - timeB;
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

  return (
    <div className="w-full max-w-7xl mx-auto mt-6 space-y-6">
      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Resource Library
          </p>
          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            Save links, articles, and videos
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Paste a URL and capture a quick visual preview for later.
          </p>
        </div>

        <form className="flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a YouTube video or article URL"
            disabled={isFetching}
            className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="submit"
            disabled={isFetching || !url.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedResources.map((resource) => {
              const title = resource.title || "Saved Link";
              const description = resource.description || "Preview unavailable.";
              const imageSrc = resource.image || PLACEHOLDER_IMAGE;

              return (
                <article
                  key={resource.id}
                  className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                      <img
                        src={imageSrc}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.src = PLACEHOLDER_IMAGE;
                        }}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/45 to-transparent" />
                    </div>

                    <div className="space-y-3 p-5">
                      <h3
                        className="text-lg font-bold text-gray-900"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {title}
                      </h3>

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

                  <button
                    type="button"
                    onClick={() => onDeleteResource(resource.id)}
                    className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-md backdrop-blur transition hover:bg-red-50 hover:text-red-600"
                    aria-label={`Delete ${title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default ResourceLibrary;