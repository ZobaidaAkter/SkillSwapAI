import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-white transition hover:text-blue-400"
            >
              Skill<span className="text-blue-500">Swap</span> AI
            </Link>

            <p className="mt-4 max-w-sm leading-7">
              A student-focused skill-sharing platform designed to help
              learners teach, connect, collaborate, and grow together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/"
                className="transition hover:text-blue-400"
              >
                Home
              </Link>

              <Link
                href="/explore"
                className="transition hover:text-blue-400"
              >
                Explore Skills
              </Link>

              <Link
                href="/categories"
                className="transition hover:text-blue-400"
              >
                Categories
              </Link>

              <Link
                href="/about"
                className="transition hover:text-blue-400"
              >
                About
              </Link>
            </div>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="font-semibold text-white">
              Start Learning
            </h3>

            <p className="mt-4 leading-7">
              Join SkillSwap AI and start sharing your skills with other
              students.
            </p>

            <Link
              href="/register"
              className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
            >
              Get Started →
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>© 2026 SkillSwap AI. All Rights Reserved.</p>

          <div className="flex gap-6">
            <Link
              href="/about"
              className="transition hover:text-blue-400"
            >
              About
            </Link>

            <Link
              href="/register"
              className="transition hover:text-blue-400"
            >
              Join SkillSwap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
