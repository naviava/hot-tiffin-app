"use server";

import { getServerSession } from "next-auth";
import { db } from "~/lib/db";

export async function getUserProfile() {
  try {
    const session = await getServerSession();
    if (!session || !session?.user || !session.user.email) return undefined;

    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        // empId: true,
        name: true,
        email: true,
        image: true,
      },
    });

    if (!user) return undefined;

    return session.user;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
