import CustomizePage from "~/components/dashboard/customize-page";

interface DashboardHomePageProps {
  searchParams: { tab: string | null };
}

export default function DashboardHomePage({
  searchParams,
}: DashboardHomePageProps) {
  const { tab } = searchParams;

  return (
    <>
      {!tab && <p>Home</p>}
      {tab === "menu" && <p>Menu</p>}
      {tab === "orders" && <p>Orders</p>}
      {tab === "history" && <p>History</p>}
      {tab === "reports" && <p>Reports</p>}
      {tab === "customize" && <CustomizePage />}
    </>
  );
}
