import { Suspense } from "react";
import { Dashboard } from "@/components/admin/dashboard";
import { Loading } from "@/components/shared/loading";

export default function AdminPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
