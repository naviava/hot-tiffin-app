import { redirect } from "next/navigation";
import SideNavbar from "~/components/dashboard/side-navbar";
import { serverClient } from "~/app/_trpc/server-client";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await serverClient.user.getUserProfile();
  if (!user) return redirect("/");

  return (
    <div className="relative h-full">
      <nav className="absolute inset-y-0 left-0 flex w-[7rem] flex-col items-center justify-between bg-white px-4 pb-14 pt-8">
        <h2>LOGO</h2>
        <SideNavbar />
        <p className="text-center">Avatar</p>
      </nav>
      <main className="pl-[7rem]">{children}</main>
    </div>
  );
}
