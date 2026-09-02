"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

type Skill = {
  skill_id: number;
  skill_name: string;
  description: string | null;
  category_id: number | null;
  category_name: string | null;
};

type Category = {
  name: string;
  icon: string;
  skills: Skill[];
};

const categoryIcons: Record<string, string> = {
  Programming: "💻",
  "Graphic Design": "🎨",
  "Web Development": "🌐",
  "UI/UX Design": "🖌️",
  "Digital Marketing": "📈",
  Photography: "📷",
  "Language Learning": "🌍",
  "Public Speaking": "🎤",
};

export default function CategoriesPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
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
      } catch (err) {
        console.error("Categories Error:", err);
        setError(
          "Unable to load categories. Please make sure the backend server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const categories = useMemo<Category[]>(() => {
    const grouped: Record<string, Skill[]> = {};

    skills.forEach((skill) => {
      const categoryName = skill.category_name || "Other";

      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }

      grouped[categoryName].push(skill);
    });

    return Object.entries(grouped)
      .map(([name, categorySkills]) => ({
        name,
        icon: categoryIcons[name] || "📚",
        skills: categorySkills,
      }))
      .filter((category) => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) return true;

        return (
          category.name.toLowerCase().includes(keyword) ||
          category.skills.some(
            (skill) =>
              skill.skill_name.toLowerCase().includes(keyword) ||
              (skill.description || "")
                .toLowerCase()
                .includes(keyword)
          )
        );
      });
  }, [skills, search]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute right-1/4 top-20 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center sm:px-8">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Browse by category
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Explore <span className="text-blue-500">Categories</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
            Find the right skill area and discover opportunities to learn
            from other students.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="flex items-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
              <span className="mr-3 text-xl">🔍</span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories or skills..."
                className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Skill Categories
            </h2>

            <p className="mt-2 text-gray-400">
              {loading
                ? "Loading categories..."
                : `${categories.length} categor${
                    categories.length === 1 ? "y" : "ies"
                  } available`}
            </p>
          </div>

          {search && !loading && (
            <button
              onClick={() => setSearch("")}
              className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
            >
              Clear
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-10 text-center">
            <div className="text-4xl">⚠️</div>

            <h3 className="mt-4 text-xl font-semibold">
              Unable to load categories
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
        {!loading && !error && categories.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <div className="text-4xl">🔎</div>

            <h3 className="mt-4 text-xl font-semibold">
              No categories found
            </h3>

            <p className="mt-2 text-gray-400">
              Try searching for a different category or skill.
            </p>
          </div>
        )}

        {/* Category Cards */}
        {!loading && !error && categories.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-3xl transition group-hover:scale-110">
                    {category.icon}
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                    {category.skills.length} skill
                    {category.skills.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {category.name}
                </h3>

                <div className="mt-4 space-y-2">
                  {category.skills.slice(0, 4).map((skill) => (
                    <div
                      key={skill.skill_id}
                      className="rounded-lg bg-white/[0.03] px-3 py-2 text-sm text-gray-300"
                    >
                      {skill.skill_name}
                    </div>
                  ))}

                  {category.skills.length > 4 && (
                    <p className="pt-1 text-xs text-gray-500">
                      +{category.skills.length - 4} more skills
                    </p>
                  )}
                </div>

                <Link
                  href="/explore"
                  className="mt-6 block rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-center text-sm font-medium text-blue-400 transition hover:bg-blue-500 hover:text-white"
                >
                  Explore {category.name} →
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
            Ready to share your skills?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Create your profile, add the skills you can teach, and connect
            with students who want to learn.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-7 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Join SkillSwap AI →
          </Link>
        </div>
      </section>
    </main>
  );
}
