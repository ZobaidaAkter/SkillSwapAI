"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: formData.full_name,
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");

        setFormData({
          full_name: "",
          username: "",
          email: "",
          phone: "",
          location: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <Input
        name="full_name"
        label="Full Name"
        placeholder="Enter your full name"
        value={formData.full_name}
        onChange={handleChange}
      />

      <Input
        name="username"
        label="Username"
        placeholder="Choose a username"
        value={formData.username}
        onChange={handleChange}
      />

      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        name="phone"
        label="Phone"
        type="tel"
        placeholder="Enter your phone number"
        value={formData.phone}
        onChange={handleChange}
      />

      <Input
        name="location"
        label="Location"
        placeholder="Enter your location"
        value={formData.location}
        onChange={handleChange}
      />

      <Input
        name="password"
        label="Password"
        type="password"
        placeholder="Create a password"
        value={formData.password}
        onChange={handleChange}
      />

      <Input
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      {message && (
        <p className="text-center text-sm text-gray-300">
          {message}
        </p>
      )}

      <Button type="submit">
        {loading ? "Creating Account..." : "Create Account"}
      </Button>

      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="
            font-medium
            text-blue-500
            transition
            hover:text-blue-400
            hover:underline
          "
        >
          Login
        </Link>
      </p>

    </form>
  );
}
