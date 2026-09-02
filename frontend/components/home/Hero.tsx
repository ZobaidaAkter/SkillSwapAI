import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background glow */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 md:py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="mb-7 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
            🚀 Learn. Teach. Connect. Grow.
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            Learn Skills.
            <br />
            <span className="text-blue-500">Teach Skills.</span>
            <br />
            Grow Together.
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">
            SkillSwap AI is a modern student skill-sharing platform where you
            can discover new skills, teach what you know, connect with
            like-minded students, and grow together.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="rounded-xl bg-blue-600 px-8 py-4 text-center font-semibold transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Get Started →
            </Link>

            <Link
              href="/explore"
              className="rounded-xl border border-white/30 bg-white/5 px-8 py-4 text-center font-semibold transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-950"
            >
              Explore Skills
            </Link>
          </div>

          {/* Trust / Quick Info */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-sm text-gray-400">
            <span>✓ Student-focused</span>
            <span>✓ Skill-based learning</span>
            <span>✓ Peer-to-peer collaboration</span>
          </div>
        </div>
      </div>
    </section>
  );
}
