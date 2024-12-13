import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import LoginForm from "@/components/auth/login-form";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/portal");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
