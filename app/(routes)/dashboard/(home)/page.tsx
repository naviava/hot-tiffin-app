import { redirect } from "next/navigation";

interface DashboardProps {}

export default function Dashboard({}: DashboardProps) {
  return redirect("/dashboard/menu");
}
