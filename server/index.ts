import { router } from "~/server/trpc";

import { userRouter } from "./routers/user-router";
import { listRouter } from "./routers/list-router";
import { menuRouter } from "./routers/menu-router";

export const appRouter = router({
  user: userRouter,
  list: listRouter,
  menu: menuRouter,
});

export type AppRouter = typeof appRouter;
