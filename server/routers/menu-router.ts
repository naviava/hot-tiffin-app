import * as z from "zod";

import { db } from "~/lib/db";
import { router, staffProcedure } from "~/server/trpc";

export const menuRouter = router({
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
});
