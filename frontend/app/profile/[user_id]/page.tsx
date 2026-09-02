"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type User = {
  user_id: number;
  full_name: string;
  username: string;
  email: string;
  created_at: string;
};

type Skill = {
  skill_id: number;
  skill_name: string;
  category_id: number;
  description: string | null;
  skill_type: "teach" | "learn";
  proficiency: string | null;
};

export default function StudentProfilePage() {
  const params = useParams();
  const userId = params.user_id;

  const [user, setUser] = useState<User | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/profile/${userId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load profile");
        }

        setUser(data.user);
        setSkills(data.skills || []);
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const teachSkills = skills.filter(
    (skill) => skill.skill_type === "teach"
  );

  const learnSkills = skills.filter(
    (skill) => skill.skill_type === "learn"
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
        Loading profile...
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#050816] flex items-center justify-center text-red-400">
        {error}
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">

      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#080d20]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

          <Link
            href="/dashboard"
            className="text-2xl font-bold"
          >
            SkillSwap <span className="text-blue-500">AI</span>
          </Link>

          <Link
            href="/find-skills"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Find Skills
          </Link>

        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-10">

        {/* Profile Header */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-8">

          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-4xl">
              {user.full_name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                {user.full_name}
              </h1>

              <p className="mt-1 text-gray-400">
                @{user.username}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {user.email}
              </p>
            </div>

          </div>

        </div>

        {/* Skills */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Teach */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <h2 className="mb-5 text-xl font-semibold">
              🎓 I Can Teach
            </h2>

            {teachSkills.length === 0 ? (
              <p className="text-gray-500">
                No teaching skills added yet.
              </p>
            ) : (
              <div className="space-y-3">

                {teachSkills.map((skill) => (
                  <div
                    key={skill.skill_id}
                    className="rounded-xl bg-[#0b1024] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">

                      <h3 className="font-medium">
                        {skill.skill_name}
                      </h3>

                      {skill.proficiency && (
                        <span className="text-sm text-blue-400">
                          {skill.proficiency}
                        </span>
                      )}

                    </div>

                    {skill.description && (
                      <p className="mt-2 text-sm text-gray-400">
                        {skill.description}
                      </p>
                    )}

                  </div>
                ))}

              </div>
            )}

          </section>

          {/* Learn */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <h2 className="mb-5 text-xl font-semibold">
              📚 I Want to Learn
            </h2>

            {learnSkills.length === 0 ? (
              <p className="text-gray-500">
                No learning skills added yet.
              </p>
            ) : (
              <div className="space-y-3">

                {learnSkills.map((skill) => (
                  <div
                    key={skill.skill_id}
                    className="rounded-xl bg-[#0b1024] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">

                      <h3 className="font-medium">
                        {skill.skill_name}
                      </h3>

                      {skill.proficiency && (
                        <span className="text-sm text-blue-400">
                          {skill.proficiency}
                        </span>
                      )}

                    </div>

                    {skill.description && (
                      <p className="mt-2 text-sm text-gray-400">
                        {skill.description}
                      </p>
                    )}

                  </div>
                ))}

              </div>
            )}

          </section>

        </div>

      </section>

    </main>
  );
}