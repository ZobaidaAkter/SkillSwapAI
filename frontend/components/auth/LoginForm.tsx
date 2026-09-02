"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");

    if (!formData.email || !formData.password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");

        // Save logged-in user
        localStorage.setItem("user", JSON.stringify(data.user));

        // Temporary redirect
        window.location.href = "/dashboard";
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />

      {message && (
        <p className="text-center text-sm text-gray-300">
          {message}
        </p>
      )}

      <Button type="submit">
        {loading ? "Logging in..." : "Login"}
      </Button>

      <div className="flex justify-between text-sm text-gray-400">

        <Link
          href="/forgot-password"
          className="hover:text-blue-400"
        >
          Forgot Password?
        </Link>

        <Link
          href="/register"
          className="hover:text-blue-400"
        >
          Create Account
        </Link>

      </div>

    </form>
  );
}