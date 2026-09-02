"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Skill = {
  skill_id: number;
  skill_name: string;
  description: string;
  category_name: string;
};

type UserSkill = {
  user_skill_id: number;
  skill_id: number;
  skill_name: string;
  skill_type: "teach" | "learn";
  proficiency: string | null;
  category_name: string;
};

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [skillType, setSkillType] = useState<"teach" | "learn">("teach");
  const [proficiency, setProficiency] = useState("Beginner");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserId(user.user_id);
    }

    fetchSkills();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserSkills(userId);
    }
  }, [userId]);

  const fetchSkills = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/skills"
      );

      const data = await response.json();

      if (data.success) {
        setSkills(data.skills);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserSkills = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/skills/user/${id}`
      );

      const data = await response.json();

      if (data.success) {
        setUserSkills(data.skills);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSkill = async () => {
    if (!userId) {
      setMessage("Please login first.");
      return;
    }

    if (!selectedSkill) {
      setMessage("Please select a skill.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/skills/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            skill_id: Number(selectedSkill),
            skill_type: skillType,
            proficiency,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Skill added successfully!");

        setSelectedSkill("");

        fetchUserSkills(userId);
      } else {
        setMessage(data.message || "Failed to add skill.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userSkillId: number) => {
  if (!userId) {
    setMessage("Please login first.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/skills/user/${userSkillId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setMessage("Skill removed successfully!");
      fetchUserSkills(userId);
    } else {
      setMessage(data.message || "Failed to remove skill.");
    }
  } catch (error) {
    console.error(error);
    setMessage("Could not connect to the server.");
  }
};

  const teachingSkills = userSkills.filter(
    (skill) => skill.skill_type === "teach"
  );

  const learningSkills = userSkills.filter(
    (skill) => skill.skill_type === "learn"
  );

  return (
    <main className="min-h-screen bg-[#050816] text-white">

      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#080d20]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link
            href="/dashboard"
            className="text-2xl font-bold"
          >
            SkillSwap <span className="text-blue-500">AI</span>
          </Link>

          <Link
            href="/dashboard"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Dashboard
          </Link>

        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm text-blue-400">
            Skill Management
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            My Skills
          </h1>

          <p className="mt-2 text-gray-400">
            Add skills you can teach and skills you want to learn.
          </p>
        </div>

        {/* Add Skill */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-6">

          <h2 className="mb-6 text-xl font-semibold">
            Add a Skill
          </h2>

          <div className="grid gap-5 md:grid-cols-4">

            {/* Skill */}
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Select Skill
              </label>

              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#0b1024] px-4 py-3 text-white outline-none focus:border-blue-500"
              >
                <option value="">
                  Choose a skill
                </option>

                {skills.map((skill) => (
                  <option
                    key={skill.skill_id}
                    value={skill.skill_id}
                  >
                    {skill.skill_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Skill Type
              </label>

              <select
                value={skillType}
                onChange={(e) =>
                  setSkillType(
                    e.target.value as "teach" | "learn"
                  )
                }
                className="w-full rounded-lg border border-white/10 bg-[#0b1024] px-4 py-3 text-white outline-none focus:border-blue-500"
              >
                <option value="teach">
                  I Can Teach
                </option>

                <option value="learn">
                  I Want to Learn
                </option>
              </select>
            </div>

            {/* Proficiency */}
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Proficiency
              </label>

              <select
                value={proficiency}
                onChange={(e) =>
                  setProficiency(e.target.value)
                }
                className="w-full rounded-lg border border-white/10 bg-[#0b1024] px-4 py-3 text-white outline-none focus:border-blue-500"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* Button */}
            <div className="flex items-end">
              <button
                onClick={handleAddSkill}
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium transition hover:bg-blue-500 disabled:opacity-50"
              >
                {loading ? "Adding..." : "+ Add Skill"}
              </button>
            </div>

          </div>

          {message && (
            <p className="mt-5 text-center text-sm text-blue-400">
              {message}
            </p>
          )}

        </div>

        {/* Skill Lists */}
        <div className="grid gap-8 md:grid-cols-2">

          {/* Teach */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <h2 className="mb-6 text-xl font-semibold">
              🎓 Skills I Can Teach
            </h2>

            {teachingSkills.length === 0 ? (
              <p className="text-gray-500">
                No teaching skills added yet.
              </p>
            ) : (
              <div className="space-y-4">

                {teachingSkills.map((skill) => (
                  <div
                    key={skill.user_skill_id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0b1024] p-4"
                  >

                    <div>
                      <h3 className="font-medium">
                        {skill.skill_name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {skill.category_name} ·{" "}
                        {skill.proficiency}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleDelete(skill.user_skill_id)
                      }
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>

                  </div>
                ))}

              </div>
            )}

          </div>

          {/* Learn */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <h2 className="mb-6 text-xl font-semibold">
              📚 Skills I Want to Learn
            </h2>

            {learningSkills.length === 0 ? (
              <p className="text-gray-500">
                No learning skills added yet.
              </p>
            ) : (
              <div className="space-y-4">

                {learningSkills.map((skill) => (
                  <div
                    key={skill.user_skill_id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0b1024] p-4"
                  >

                    <div>
                      <h3 className="font-medium">
                        {skill.skill_name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {skill.category_name} ·{" "}
                        {skill.proficiency}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleDelete(skill.user_skill_id)
                      }
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>

                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

      </section>
    </main>
  );
}