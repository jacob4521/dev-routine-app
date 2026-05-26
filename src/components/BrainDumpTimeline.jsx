import React from "react";

function BrainDumpTimeline({ brainDumps, tasks }) {
  if (!brainDumps || brainDumps.length === 0) {
    return (
      <div className="mx-auto mt-8 max-w-5xl space-y-6">
        <section className="overflow-hidden rounded-4xl border border-slate-200 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
          <div className="flex flex-col gap-6 p-6 md:p-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
                Brain Dumps
              </p>
              <div>
                <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                  Clear the noise before you focus.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 md:text-base">
                  Capture the stray thoughts, unfinished notes, and mental clutter that would otherwise pull you away.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center text-slate-500 shadow-sm">
          <p className="text-4xl mb-3">🧠</p>
          <p className="text-lg font-semibold text-slate-700">No mind clears yet.</p>
          <p className="mt-1 text-sm">
            Your brain dumps will appear here when you clear your mind before a task.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 max-w-5xl space-y-6">
      <section className="overflow-hidden rounded-4xl border border-slate-200 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
        <div className="flex flex-col gap-6 p-6 md:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
              Brain Dumps
            </p>
            <div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Timeline of cleared thoughts.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 md:text-base">
                Review what was on your mind, when you wrote it down, and what task it belonged to.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">Entries</p>
            <p className="mt-1 text-3xl font-black text-white">{brainDumps.length}</p>
          </div>
        </div>
      </section>

      <div className="relative mx-auto max-w-3xl border-l-2 border-slate-200 pl-6">
        {brainDumps.map((dump) => {
          const relatedTask = tasks.find((t) => t.id === dump.taskId);

          return (
            <div key={dump.id} className="relative mb-8">
              <div className="absolute -left-8.25 top-2 h-4 w-4 rounded-full border-4 border-white bg-sky-500 shadow-sm" />

              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {dump.time}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="mb-2 text-lg font-bold text-slate-900">
                  {dump.title}
                </h3>
                {dump.description && (
                  <p className="mb-4 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {dump.description}
                  </p>
                )}

                {relatedTask && (
                  <div className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
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