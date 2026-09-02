import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Join SkillSwap AI"
      subtitle="Create your account and start exchanging skills with students."
    >
      <RegisterForm />
    </AuthLayout>
  );
}