import { TRPCError } from "@trpc/server";

import { db } from "~/lib/db";
import { router, publicProcedure } from "~/server/trpc";

export const listRouter = router({
  getCategories: publicProcedure.query(async () => {
    const categories = await db.category.findMany({});

    if (!categories)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No categories found.",
      });

    return categories;
  }),
});
