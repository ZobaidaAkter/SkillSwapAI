import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Create your account and add the skills you can teach or want to learn.",
  },
  {
    number: "02",
    title: "Discover Skills",
    description:
      "Explore available skills and find students who can teach what you want to learn.",
  },
  {
    number: "03",
    title: "Send a Request",
    description:
      "View student profiles and send a skill request to start a learning connection.",
  },
  {
    number: "04",
    title: "Learn & Teach",
    description:
      "Accept requests, share knowledge, and grow together through skill exchange.",
  },
];

const features = [
  {
    icon: "🔎",
    title: "Skill Discovery",
    description:
      "Search and explore different skills shared by students.",
  },
  {
    icon: "👤",
    title: "Student Profiles",
    description:
      "View student information and discover the skills they can teach or want to learn.",
  },
  {
    icon: "📨",
    title: "Skill Requests",
    description:
      "Send, receive, accept, or reject skill exchange requests.",
  },
  {
    icon: "🤝",
    title: "Peer Learning",
    description:
      "Connect students and make learning more collaborative and meaningful.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:px-8 md:py-32">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            About SkillSwap AI
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Learn From Others.
            <br />
            <span className="text-blue-500">Share What You Know.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-400 sm:text-xl">
            SkillSwap AI is a student-focused skill-sharing platform designed
            to make peer-to-peer learning easier, more accessible, and more
            collaborative.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/explore"
              className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Explore Skills →
            </Link>

            <Link
              href="/register"
              className="rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 font-semibold transition hover:bg-white hover:text-slate-950"
            >
              Join SkillSwap
            </Link>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="bg-slate-900 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:px-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-2xl">
              💡
            </div>

            <h2 className="mt-7 text-2xl font-bold sm:text-3xl">
              The Problem
            </h2>

            <p className="mt-5 leading-8 text-gray-400">
              Students often have valuable skills they can teach while also
              wanting to learn new skills from others. However, finding the
              right person and starting that connection can be difficult.
            </p>

            <p className="mt-4 leading-8 text-gray-400">
              Many learning platforms focus mainly on one-way learning rather
              than student-to-student skill exchange.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-500/20 bg-blue-500/[0.04] p-8 sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
              🚀
            </div>

            <h2 className="mt-7 text-2xl font-bold sm:text-3xl">
              Our Solution
            </h2>

            <p className="mt-5 leading-8 text-gray-400">
              SkillSwap AI provides a simple platform where students can
              discover skills, create profiles, find suitable students, and
              connect through skill requests.
            </p>

            <p className="mt-4 leading-8 text-gray-400">
              The platform encourages students to become both learners and
              teachers by sharing knowledge with one another.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-b border-white/10 bg-slate-950 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Our Mission
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Everyone has something to
            <span className="text-blue-500"> teach and learn.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Our mission is to encourage knowledge sharing among students and
            create a collaborative environment where learning goes beyond the
            traditional classroom.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Simple Process
            </span>

            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              How Skill<span className="text-blue-500">Swap</span> Works
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-400">
              Start your skill-sharing journey through four simple steps.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/[0.06]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 font-bold text-blue-400">
                  {step.number}
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Platform Features
            </span>

            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Built for <span className="text-blue-500">Peer Learning</span>
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-400">
              Everything you need to discover skills and connect with other
              students.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/[0.06]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-slate-900">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to start learning and sharing?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Explore available skills, discover students, and become part of
            the SkillSwap AI community.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/explore"
              className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Explore Skills →
            </Link>

            <Link
              href="/register"
              className="rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 font-semibold transition hover:bg-white hover:text-slate-950"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-gray-500 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>© 2026 SkillSwap AI. All Rights Reserved.</p>

          <div className="flex gap-6">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <Link href="/explore" className="transition hover:text-white">
              Explore
            </Link>

            <Link href="/categories" className="transition hover:text-white">
              Categories
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}