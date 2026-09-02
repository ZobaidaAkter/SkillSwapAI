"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Request = {
  request_id: number;
  sender_id: number;
  receiver_id: number;
  skill_id: number;
  message: string | null;
  status: "pending" | "accepted" | "rejected";
  created_at: string;

  sender_name?: string;
  sender_username?: string;

  receiver_name?: string;
  receiver_username?: string;

  skill_name: string;
};

export default function RequestsPage() {
  const [userId, setUserId] = useState<number | null>(null);

  const [incomingRequests, setIncomingRequests] = useState<Request[]>([]);
  const [sentRequests, setSentRequests] = useState<Request[]>([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserId(user.user_id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchRequests(userId);
    }
  }, [userId]);

  const fetchRequests = async (id: number) => {
    setLoading(true);

    try {
      const [incomingResponse, sentResponse] = await Promise.all([
        fetch(
          `http://localhost:5000/api/requests/incoming/${id}`
        ),
        fetch(
          `http://localhost:5000/api/requests/sent/${id}`
        ),
      ]);

      const incomingData = await incomingResponse.json();
      const sentData = await sentResponse.json();

      if (incomingData.success) {
        setIncomingRequests(incomingData.requests);
      }

      if (sentData.success) {
        setSentRequests(sentData.requests);
      }
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
  requestId: number,
  status: "accepted" | "rejected"
) => {
  if (!userId) {
    setMessage("Please login first.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/requests/${requestId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          user_id: userId,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);

      fetchRequests(userId);
    } else {
      setMessage(
        data.message || "Failed to update request."
      );
    }
  } catch (error) {
    console.error(error);
    setMessage("Could not connect to the server.");
  }
};

  const getStatusStyle = (status: Request["status"]) => {
    if (status === "accepted") {
      return "text-green-400";
    }

    if (status === "rejected") {
      return "text-red-400";
    }

    return "text-yellow-400";
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
            Skill Exchange
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Skill Requests
          </h1>

          <p className="mt-2 text-gray-400">
            Manage the skill exchange requests you send and receive.
          </p>
        </div>

        {message && (
          <div className="mb-8 rounded-lg border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-400">
            {message}
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center text-gray-400">
            Loading requests...
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">

            {/* Incoming Requests */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

              <h2 className="mb-6 text-xl font-semibold">
                📥 Incoming Requests
              </h2>

              {incomingRequests.length === 0 ? (
                <div className="rounded-xl bg-[#0b1024] p-8 text-center">
                  <div className="mb-3 text-3xl">
                    📭
                  </div>

                  <p className="text-gray-500">
                    No incoming requests yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">

                  {incomingRequests.map((request) => (
                    <div
                      key={request.request_id}
                      className="rounded-xl border border-white/10 bg-[#0b1024] p-5"
                    >

                      <div className="mb-4 flex items-center justify-between">

                        <div>
                          <h3 className="font-semibold">
                            {request.sender_name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            @{request.sender_username}
                          </p>
                        </div>

                        <span
                          className={`text-sm font-medium capitalize ${getStatusStyle(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>

                      </div>

                      <div className="mb-4 rounded-lg bg-white/5 p-4">

                        <p className="text-sm text-gray-500">
                          Wants to learn
                        </p>

                        <p className="mt-1 font-medium text-blue-400">
                          {request.skill_name}
                        </p>

                      </div>

                      {request.message && (
                        <p className="mb-5 text-sm text-gray-400">
                          “{request.message}”
                        </p>
                      )}

                      {request.status === "pending" && (
                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              updateStatus(
                                request.request_id,
                                "accepted"
                              )
                            }
                            className="flex-1 rounded-lg bg-green-600 px-4 py-2.5 font-medium transition hover:bg-green-500"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(
                                request.request_id,
                                "rejected"
                              )
                            }
                            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-medium transition hover:bg-red-500"
                          >
                            Reject
                          </button>

                        </div>
                      )}

                    </div>
                  ))}

                </div>
              )}

            </div>

            {/* Sent Requests */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

              <h2 className="mb-6 text-xl font-semibold">
                📤 Sent Requests
              </h2>

              {sentRequests.length === 0 ? (
                <div className="rounded-xl bg-[#0b1024] p-8 text-center">
                  <div className="mb-3 text-3xl">
                    📭
                  </div>

                  <p className="text-gray-500">
                    No sent requests yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">

                  {sentRequests.map((request) => (
                    <div
                      key={request.request_id}
                      className="rounded-xl border border-white/10 bg-[#0b1024] p-5"
                    >

                      <div className="mb-4 flex items-center justify-between">

                        <div>
                          <h3 className="font-semibold">
                            {request.receiver_name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            @{request.receiver_username}
                          </p>
                        </div>

                        <span
                          className={`text-sm font-medium capitalize ${getStatusStyle(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>

                      </div>

                      <div className="rounded-lg bg-white/5 p-4">

                        <p className="text-sm text-gray-500">
                          Skill Requested
                        </p>

                        <p className="mt-1 font-medium text-blue-400">
                          {request.skill_name}
                        </p>

                      </div>

                      {request.message && (
                        <p className="mt-4 text-sm text-gray-400">
                          “{request.message}”
                        </p>
                      )}

                    </div>
                  ))}

                </div>
              )}

            </div>

          </div>
        )}

      </section>
    </main>
  );
}