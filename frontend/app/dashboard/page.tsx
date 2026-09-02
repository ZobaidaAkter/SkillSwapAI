"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type User = {
  user_id: number;
  role_id: number;
  full_name: string;
  username: string;
  email: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white">

      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#080d20]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link
            href="/"
            className="text-2xl font-bold"
          >
            SkillSwap <span className="text-blue-500">AI</span>
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            Logout
          </button>

        </div>
      </nav>

      {/* Dashboard */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* Welcome */}
        <div className="mb-10">
          <p className="mb-2 text-sm text-blue-400">
            Student Dashboard
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Welcome{user ? `, ${user.full_name}` : ""}! 👋
          </h1>

          <p className="mt-2 text-gray-400">
            Learn skills, teach skills, and grow together.
          </p>
        </div>

        {/* User Info */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-5 text-xl font-semibold">
            My Profile
          </h2>

          {user ? (
            <div className="grid gap-5 md:grid-cols-3">

              <div>
                <p className="text-sm text-gray-500">
                  Full Name
                </p>
                <p className="mt-1 font-medium">
                  {user.full_name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Username
                </p>
                <p className="mt-1 font-medium">
                  @{user.username}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>
                <p className="mt-1 font-medium">
                  {user.email}
                </p>
              </div>

            </div>
          ) : (
            <p className="text-gray-400">
              Please login to view your profile.
            </p>
          )}
        </div>

        {/* Features */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <Link
            href="/profile"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-blue-500/40"
          >
            <div className="mb-4 text-3xl">👤</div>
            <h3 className="text-lg font-semibold">
              My Profile
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              View and update your profile.
            </p>
          </Link>

          <Link
            href="/skills"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-blue-500/40"
          >
            <div className="mb-4 text-3xl">💡</div>
            <h3 className="text-lg font-semibold">
              My Skills
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Add skills you can teach and want to learn.
            </p>
          </Link>

          <Link
            href="/find-skills"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-blue-500/40"
          >
            <div className="mb-4 text-3xl">🔍</div>
            <h3 className="text-lg font-semibold">
              Find Skills
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Find students with matching skills.
            </p>
          </Link>

          <Link
            href="/requests"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-blue-500/40"
          >
            <div className="mb-4 text-3xl">🔗</div>
            <h3 className="text-lg font-semibold">
              Skill Requests
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Manage your skill exchange requests.
            </p>
          </Link>

        </div>

      </section>

    </main>
  );
}