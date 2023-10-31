import { getServerSession } from "next-auth";
import { db } from "~/lib/db";
import { router, publicProcedure } from "~/server/trpc";

export const userRouter = router({
  getUserProfile: publicProcedure.query(async () => {
    const session = await getServerSession();
    if (!session || !session?.user || !session.user.email) return null;

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return null;

    return {
      name: user.name,
      empId: user.empId,
      email: user.email,
      image: user.image,
      role: user.role,
      disabled: user.disabled,
    };
  }),
});
