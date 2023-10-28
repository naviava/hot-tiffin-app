import Link from "next/link";
import { serverClient } from "~/app/_trpc/server-client";
import UserDetails from "~/components/user-details";

export default async function Home() {
  const user = await serverClient.user.getUserProfile();

  return (
    <div className="mx-auto max-w-xl">
      <div className=" flex justify-between bg-red-300 text-3xl">
        Hello, {user?.name ? user.name : "World!"}
        {!user && <Link href="/api/auth/signin">Sign in</Link>}
      </div>
      <UserDetails />
    </div>
  );
}
