import { getServerSession } from "next-auth";
import { TRPCError, initTRPC } from "@trpc/server";

import { db } from "~/lib/db";

const t = initTRPC.create();
const middleware = t.middleware;

// Logged in users only middleware.
const isAuthenticated = middleware(async (opts) => {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized action",
    });

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.disabled)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized action",
    });

  return opts.next({
    ctx: {
      user: {
        name: user.name,
        email: user.email,
        empId: user.empId,
        image: user.image,
        role: user.role,
        disabled: user.disabled,
      },
    },
  });
});

// Staff only middleware.
const isStaff = middleware(async (opts) => {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized action",
    });

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.disabled || user.role === "CUSTOMER")
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized action",
    });

  return opts.next({
    ctx: {
      user: {
        name: user.name,
        email: user.email,
        empId: user.empId,
        image: user.image,
        role: user.role,
        disabled: user.disabled,
      },
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthenticated);
export const staffProcedure = t.procedure.use(isStaff);
