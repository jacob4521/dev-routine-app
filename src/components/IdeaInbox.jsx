import React from "react";

const IdeaInbox = ({
  newIdeaTitle,
  setNewIdeaTitle,
  handleAddIdea,
  inboxIdeas,
  handlePlanIdea,
  deleteIdea,
}) => {
  return (
    <div className="mx-auto mt-8 max-w-5xl space-y-6">
      <section className="overflow-hidden rounded-4xl border border-slate-200 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
        <div className="flex flex-col gap-6 p-6 md:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
              Idea Inbox
            </p>
            <div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Capture sparks before they disappear.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 md:text-base">
                Drop in half-formed thoughts, then turn them into tasks when the timing is right.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">Captured ideas</p>
            <p className="mt-1 text-3xl font-black text-white">{inboxIdeas.length}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Quick capture
            </p>
            <h3 className="mt-1 text-lg font-bold text-slate-900">Save a new thought</h3>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            placeholder="Got a new idea? Type it here..."
            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/15"
            value={newIdeaTitle}
            onChange={(e) => setNewIdeaTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddIdea(newIdeaTitle);
              }
            }}
          />

          <button
            className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            onClick={() => handleAddIdea(newIdeaTitle)}
          >
            Add Idea
          </button>
        </div>
      </section>

      <section className="space-y-3">
        {inboxIdeas.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center text-slate-500 shadow-sm">
            <p className="text-3xl mb-2">🧠</p>
            <p className="font-semibold text-slate-700">No ideas yet.</p>
            <p className="mt-1 text-sm">Brainstorm something and keep it here for later.</p>
          </div>
        ) : (
          inboxIdeas.map((idea) => (
            <div
              key={idea.id}
              className="group flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="min-w-0 flex-1 font-medium text-slate-900">{idea.title}</span>
              <div className="flex shrink-0 gap-2">
                <button
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-600"
                  onClick={() => handlePlanIdea(idea)}
                >
                  Plan Idea
                </button>
                <button
                  className="rounded-full p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
                  onClick={() => deleteIdea(idea.id)}
                  aria-label={`Delete idea ${idea.title}`}
                >
                  ❌
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default IdeaInbox;
