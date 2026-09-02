import Link from "next/link";

const categories = [
  {
    name: "Programming",
    icon: "💻",
    description: "C, C++, Python, Java & more",
  },
  {
    name: "Graphic Design",
    icon: "🎨",
    description: "Creative design & visual skills",
  },
  {
    name: "Web Development",
    icon: "🌐",
    description: "Build modern websites",
  },
  {
    name: "UI/UX Design",
    icon: "🖌️",
    description: "Design better user experiences",
  },
  {
    name: "Digital Marketing",
    icon: "📈",
    description: "Marketing & growth skills",
  },
  {
    name: "Photography",
    icon: "📷",
    description: "Capture and create",
  },
  {
    name: "Language Learning",
    icon: "🌍",
    description: "Learn and share languages",
  },
  {
    name: "Public Speaking",
    icon: "🎤",
    description: "Speak with confidence",
  },
];

export default function Categories() {
  return (
    <section className="bg-slate-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Explore by interest
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Popular <span className="text-blue-500">Categories</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            Discover different skill areas and find students who can teach
            what you want to learn.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href="/explore"
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/[0.06]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl transition duration-300 group-hover:scale-110">
                {category.icon}
              </div>

              <h3 className="text-lg font-semibold">
                {category.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                {category.description}
              </p>

              <div className="mt-5 text-sm font-medium text-blue-400 transition group-hover:text-blue-300">
                Explore →
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/explore"
            className="inline-flex items-center rounded-xl border border-blue-500/30 bg-blue-500/10 px-6 py-3 font-medium text-blue-400 transition hover:bg-blue-500/20"
          >
            Explore All Skills →
          </Link>
        </div>
      </div>
    </section>
  );
}
