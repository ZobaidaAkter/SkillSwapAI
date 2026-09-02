import AuthLayout from "@/components/auth/AuthLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your email and we’ll help you recover your account."
    >
      <form className="space-y-6">

        <Input
          label="Email"
          type="email"
          placeholder="Enter your registered email"
        />

        <Button type="submit">
          Send Reset Link
        </Button>

        <div className="text-center text-sm text-gray-400">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-500 transition hover:text-blue-400 hover:underline"
          >
            Back to Login
          </Link>
        </div>

      </form>
    </AuthLayout>
  );
}