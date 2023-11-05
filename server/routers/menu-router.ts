import * as z from "zod";

import { db } from "~/lib/db";
import { publicProcedure, router, staffProcedure } from "~/server/trpc";

export const menuRouter = router({
  /**
   * MUTATION API: Adds a menu item to the database.
   */
  addMenuItem: staffProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50),
        description: z.string().nullish(),
        price: z
          .string()
          .refine((value) => /^(0|[1-9]\d*)(\.\d{1,2})?$/.test(value), {
            message:
              "Price must be a positive number with up to two digits after the decimal point",
          }),
        image: z.string().nullish(),
        categoryId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, description, price, image, categoryId } = input;

      await db.menuItem.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          image,
          category: {
            connect: { id: categoryId },
          },
        },
      });

      return "Successfully added menu item";
    }),

  /**
   * QUERY API: Gets all menu items from the database.
   * Takes an optional categoryId parameter to filter by category.
   */
  getMenuItems: staffProcedure
    .input(
      z.object({
        searchTerm: z.string().nullish(),
        categoryId: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const { searchTerm, categoryId } = input;

      const menuItems = await db.menuItem.findMany({
        where: {
          name: searchTerm
            ? { contains: searchTerm, mode: "insensitive" }
            : undefined,
          categoryId: categoryId ? { equals: categoryId } : undefined,
        },
        include: {
          category: true,
          favourites: true,
        },
      });

      return menuItems;
    }),
});
