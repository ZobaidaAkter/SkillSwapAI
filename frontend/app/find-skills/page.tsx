"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Skill = {
  skill_id: number;
  skill_name: string;
  category_name: string;
};

type Student = {
  user_id: number;
  full_name: string;
  username: string;
  email: string;
  skill_id: number;
  skill_name: string;
  proficiency: string | null;
};

export default function FindSkillsPage() {
  const searchParams = useSearchParams();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    const skillId = searchParams.get("skill_id");

    if (skillId) {
      setSelectedSkill(skillId);
    }
  }, [searchParams]);

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

  const searchStudents = async () => {
    if (!selectedSkill) {
      setMessage("Please select a skill.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/skills/find?skill_id=${selectedSkill}&user_id=${userId || ""}`
      );

      const data = await response.json();

      if (data.success) {
        setStudents(data.students);

        if (data.students.length === 0) {
          setMessage(
            "No students found for this skill yet."
          );
        }
      } else {
        setMessage("Failed to search students.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const sendRequest = async (student: Student) => {
  if (!userId) {
    setMessage("Please login first.");
    return;
  }

  setMessage("");

  try {
    const response = await fetch(
      "http://localhost:5000/api/requests",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_id: userId,
          receiver_id: student.user_id,
          skill_id: student.skill_id,
          message: `I would like to learn ${student.skill_name} from you.`,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setMessage(
        `Request sent successfully to ${student.full_name}!`
      );
    } else {
      setMessage(data.message || "Failed to send request.");
    }
  } catch (error) {
    console.error(error);
    setMessage("Could not connect to the server.");
  }
};

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
            Skill Discovery
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Find Skills
          </h1>

          <p className="mt-2 text-gray-400">
            Find students who can teach the skills you want to learn.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-6">

          <h2 className="mb-5 text-xl font-semibold">
            What do you want to learn?
          </h2>

          <div className="flex flex-col gap-4 md:flex-row">

            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="flex-1 rounded-lg border border-white/10 bg-[#0b1024] px-4 py-3 text-white outline-none focus:border-blue-500"
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

            <button
              onClick={searchStudents}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-8 py-3 font-medium transition hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>

          </div>

          {message && (
            <p className="mt-4 text-sm text-blue-400">
              {message}
            </p>
          )}

        </div>

        {/* Results */}
        <div>

          <h2 className="mb-6 text-2xl font-semibold">
            Available Students
          </h2>

          {students.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <div className="mb-4 text-4xl">
                🔍
              </div>

              <p className="text-gray-400">
                Search for a skill to find students.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {students.map((student) => (
                <div
                  key={`${student.user_id}-${student.skill_id}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-blue-500/40"
                >

                  <div className="mb-5 flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-xl">
                      👤
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {student.full_name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        @{student.username}
                      </p>
                    </div>

                  </div>

                  <div className="mb-5 rounded-lg bg-[#0b1024] p-4">

                    <p className="text-sm text-gray-500">
                      Can Teach
                    </p>

                    <p className="mt-1 font-medium text-blue-400">
                      {student.skill_name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Proficiency:{" "}
                      {student.proficiency || "Not specified"}
                    </p>

                  </div>

                  <button
  className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium transition hover:bg-blue-500"
  onClick={() => sendRequest(student)}
>
  Send Skill Request
</button>

                </div>
              ))}

            </div>
          )}

        </div>

      </section>
    </main>
  );
}