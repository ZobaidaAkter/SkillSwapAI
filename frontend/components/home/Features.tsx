
const features = [
  {
    icon: "🔍",
    title: "Find Skills",
    description:
      "Discover students who can teach the skills you want to learn and find the right learning opportunities.",
  },
  {
    icon: "🎓",
    title: "Teach & Learn",
    description:
      "Share the skills you already know while building new skills from other students in the community.",
  },
  {
    icon: "🤝",
    title: "Connect & Collaborate",
    description:
      "Send skill requests, connect with students, and build meaningful learning partnerships.",
  },
  {
    icon: "👤",
    title: "Student Profiles",
    description:
      "Explore student profiles and see what they can teach and what they want to learn.",
  },
  {
    icon: "📨",
    title: "Skill Requests",
    description:
      "Send, receive, accept, or reject skill exchange requests through a simple workflow.",
  },
  {
    icon: "🌱",
    title: "Grow Together",
    description:
      "Turn knowledge sharing into a collaborative learning experience where everyone can grow.",
  },
];

export default function Features() {
  return (
    <section className="bg-slate-900 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            What you can do
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Everything You Need to
            <span className="text-blue-500"> SkillSwap</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            A simple platform designed to help students discover skills,
            share knowledge, connect with others, and learn together.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/[0.06]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-2xl transition group-hover:scale-110">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}