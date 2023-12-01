import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { db } from "~/lib/db";
import { router, publicProcedure, staffProcedure } from "~/server/trpc";

export const listRouter = router({
  /**
   * QUERY API: Get all categories.
   */
  getCategories: publicProcedure.query(async () => {
    const categories = await db.category.findMany({});

    if (!categories)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No categories found.",
      });

    return categories;
  }),

  /**
   * MUTATION API: Update a category.
   */
  updateCategory: staffProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        icon: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { icon, id, name } = input;

      const category = await db.category.update({
        where: { id },
        data: { icon, name },
      });

      return category;
    }),

  /**
   * MUTATION API: Add category.
   */
  addCategory: staffProcedure
    .input(
      z.object({
        name: z.string().min(1),
        icon: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { icon, name } = input;

      const category = await db.category.create({
        data: { icon, name },
      });

      return category;
    }),

  /**
   * MUTATION API: Delete category.
   */
  deleteCategory: staffProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input }) => {
      const category = await db.category.delete({
        where: { id: input },
      });

      return category;
    }),
});
