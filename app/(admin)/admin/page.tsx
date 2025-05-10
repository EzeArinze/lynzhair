import DashboardLayout from "@/components/adminUI/DashboardLayout";
import { auth } from "@/lib/better-auth/auth";
import { ADMIN } from "@/lib/constant/constant";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== ADMIN) redirect("/auth/sign-in");

  return <DashboardLayout />;
}
