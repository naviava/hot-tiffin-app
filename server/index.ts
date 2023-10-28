import { router } from "~/server/trpc";
import { userRouter } from "./routers/user-router";

export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
