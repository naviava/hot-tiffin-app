import { TRPCError } from "@trpc/server";
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
  getMenuItems: publicProcedure
    .input(
      z.object({
        query: z.string().nullish(),
        categoryId: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const { query, categoryId } = input;

      const menuItems = await db.menuItem.findMany({
        where: {
          name: query ? { contains: query, mode: "insensitive" } : undefined,
          categoryId: categoryId ? { equals: categoryId } : undefined,
        },
        include: {
          category: true,
          favourites: true,
        },
      });

      return menuItems;
    }),

  /**
   * QUERY API: Gets a single menu item from the database.
   */
  getMenuItemById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const item = await db.menuItem.findUnique({
        where: { id: input },
        include: { category: true },
      });

      if (!item)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Menu item not found",
        });

      return item;
    }),

  /**
   * MUTATION API: Deletes a menu item from the database.
   */
  deleteMenuItem: staffProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const deletedItem = await db.menuItem.delete({
        where: { id: input },
      });

      if (!deletedItem)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Menu item not found",
        });

      return "Successfully deleted menu item";
    }),
});
