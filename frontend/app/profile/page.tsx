"use client";

import { useEffect, useState } from "react";

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

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    try {
      const loggedInUser = JSON.parse(storedUser);

      if (!loggedInUser.user_id) {
        setError("User information not found.");
        setLoading(false);
        return;
      }

      setUser(loggedInUser);

      fetch(
        `http://localhost:5000/api/profile/${loggedInUser.user_id}`
      )
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to load profile");
          }

          return data;
        })
        .then((data) => {
          setUser(data.user);
          setSkills(data.skills || []);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message || "Failed to load profile.");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.error(err);
      setError("Invalid user information.");
      setLoading(false);
    }
  }, []);

  const teachSkills = skills.filter(
    (skill) => skill.skill_type === "teach"
  );

  const learnSkills = skills.filter(
    (skill) => skill.skill_type === "learn"
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Profile Header */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold">
              {user.full_name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                {user.full_name}
              </h1>

              <p className="text-gray-400">
                @{user.username}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                {user.email}
              </p>
            </div>

          </div>

        </div>

        {/* Skills */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* I Can Teach */}
          <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-4">
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
                    className="bg-gray-800 rounded-xl p-4"
                  >
                    <div className="flex justify-between items-center">
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
                      <p className="text-sm text-gray-400 mt-2">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

          </section>

          {/* I Want to Learn */}
          <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-4">
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
                    className="bg-gray-800 rounded-xl p-4"
                  >
                    <div className="flex justify-between items-center">
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
                      <p className="text-sm text-gray-400 mt-2">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

          </section>

        </div>

      </div>
    </main>
  );
}