import { CustomerPortal } from "@/components/portal/customer-portal";
import { auth } from "@/lib/auth";

export default async function PortalPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <CustomerPortal userId={session.user.id} />;
}
