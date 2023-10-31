import * as z from "zod";

import { db } from "~/lib/db";
import { router, staffProcedure } from "~/server/trpc";

export const menuRouter = router({
  addMenuItem: staffProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50),
        description: z.string().nullish(),
        price: z.number().positive(),
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
          price,
          image,
          category: {
            connect: { id: categoryId },
          },
        },
      });

      return "Successfully added menu item";
    }),
});
