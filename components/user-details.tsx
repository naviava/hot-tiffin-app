"use client";

import { Suspense } from "react";
import { trpc } from "~/app/_trpc/client";

interface UserDetailsProps {}

export default function UserDetails({}: UserDetailsProps) {
  const { data: user } = trpc.user.getUserProfile.useQuery();

  return <div>{user?.name ? user.name : "Unknown"}</div>;
}
