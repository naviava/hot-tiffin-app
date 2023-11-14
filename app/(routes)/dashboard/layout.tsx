import { redirect } from "next/navigation";
import { serverClient } from "~/app/_trpc/server-client";
import Navbar from "~/components/dashboard-layout/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await serverClient.user.getUserProfile();

  if (!user) return redirect("/");
  if (user.role === "CUSTOMER") return redirect("/");

  if (user.role === "EMPLOYEE" && !user.empId) {
    await serverClient.user.createEmployeeId();
  }

  return (
    <>
      <Navbar />
      <main className="h-full overflow-x-hidden pt-12 md:pl-[7rem] md:pt-0">
        {children}
      </main>
    </>
  );
}
