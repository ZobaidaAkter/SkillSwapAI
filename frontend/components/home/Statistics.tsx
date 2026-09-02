const stats = [
  {
    value: "01",
    label: "Create Your Profile",
    description: "Set up your profile and share the skills you know.",
  },
  {
    value: "02",
    label: "Discover Skills",
    description: "Find students who can teach the skills you want to learn.",
  },
  {
    value: "03",
    label: "Send a Request",
    description: "Connect with a student and start your skill exchange.",
  },
  {
    value: "04",
    label: "Grow Together",
    description: "Learn, teach, collaborate, and grow through sharing.",
  },
];

export default function Statistics() {
  return (
    <section className="bg-slate-900 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Simple process
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            How <span className="text-blue-500">SkillSwap AI</span> Works
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            Start your skill-sharing journey in just a few simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/[0.06]"
            >
              {/* Step Number */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-lg font-bold text-blue-400 transition group-hover:scale-110">
                {stat.value}
              </div>

              <h3 className="text-xl font-semibold">
                {stat.label}
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
