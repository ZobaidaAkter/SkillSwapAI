"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

type Skill = {
  skill_id: number;
  skill_name: string;
  description: string | null;
  category_id: number | null;
  category_name: string | null;
};

export default function ExplorePage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/skills"
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load skills");
        }

        setSkills(data.skills || []);
        setFilteredSkills(data.skills || []);
      } catch (err) {
        console.error("Explore Skills Error:", err);
        setError(
          "Unable to load skills. Please make sure the backend server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      setFilteredSkills(skills);
      return;
    }

    const filtered = skills.filter(
      (skill) =>
        skill.skill_name.toLowerCase().includes(keyword) ||
        (skill.category_name || "")
          .toLowerCase()
          .includes(keyword) ||
        (skill.description || "")
          .toLowerCase()
          .includes(keyword)
    );

    setFilteredSkills(filtered);
  }, [search, skills]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
        <Navbar />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute right-1/4 top-20 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center sm:px-8">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Discover & Learn
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Explore <span className="text-blue-500">Skills</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
            Discover skills shared by students and find something new to
            learn, practice, or teach.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="flex items-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 shadow-xl">
              <span className="mr-3 text-xl">🔍</span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search skills, categories, or topics..."
                className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Available Skills
            </h2>

            <p className="mt-2 text-gray-400">
              {loading
                ? "Loading skills..."
                : `${filteredSkills.length} skill${
                    filteredSkills.length !== 1 ? "s" : ""
                  } available`}
            </p>
          </div>

          {search && !loading && (
            <button
              onClick={() => setSearch("")}
              className="text-left text-sm font-medium text-blue-400 transition hover:text-blue-300 sm:text-right"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-52 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <div className="text-3xl">⚠️</div>

            <h3 className="mt-4 text-xl font-semibold">
              Something went wrong
            </h3>

            <p className="mt-2 text-gray-400">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-500"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredSkills.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <div className="text-4xl">🔎</div>

            <h3 className="mt-4 text-xl font-semibold">
              No skills found
            </h3>

            <p className="mt-2 text-gray-400">
              Try searching for another skill or category.
            </p>

            <button
              onClick={() => setSearch("")}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-500"
            >
              Show All Skills
            </button>
          </div>
        )}

        {/* Skill Cards */}
        {!loading && !error && filteredSkills.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill) => (
              <div
                key={skill.skill_id}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
                    💡
                  </div>

                  {skill.category_name && (
                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                      {skill.category_name}
                    </span>
                  )}
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {skill.skill_name}
                </h3>

                <p className="mt-3 min-h-12 text-sm leading-6 text-gray-400">
                  {skill.description ||
                    "Learn this skill from students in the SkillSwap community."}
                </p>

                <Link
                  href={`/find-skills?skill_id=${skill.skill_id}`}
                  className="mt-6 block rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-center text-sm font-medium text-blue-400 transition hover:bg-blue-500 hover:text-white"
                >
                  Find Students →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-slate-900">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Have a skill to share?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Join SkillSwap AI, add your skills, and help other students learn
            something valuable.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-7 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Create Your Account →
          </Link>
        </div>
      </section>
    </main>
  );
}
