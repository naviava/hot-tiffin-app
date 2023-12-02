import { redirect } from "next/navigation";
import { AuthClient } from "~/components/auth/auth-client";
import { serverClient } from "~/app/_trpc/server-client";

export default async function Home() {
  const user = await serverClient.user.getUserProfile();

  if (!!user) return redirect("/dashboard");

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex flex-1 items-center">
        <div className="hidden w-[70%] lg:block">Illustration</div>
        <div className="flex h-full flex-1 items-center justify-center">
          <AuthClient />
        </div>
      </div>
      <footer className="flex items-center justify-center gap-x-4 p-4 text-sm text-muted-foreground">
        &copy; Navin Avadhani 2023
      </footer>
    </div>
  );
}
