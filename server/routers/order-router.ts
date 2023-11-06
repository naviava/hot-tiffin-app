import * as z from "zod";

import { OrderType } from "@prisma/client";

import { db } from "~/lib/db";
import { generateOrderNo } from "~/lib/generate-order-no";
import {
  publicProcedure,
  router,
  staffProcedure,
  privateProcedure,
} from "~/server/trpc";
import { TRPCError } from "@trpc/server";

const OrderTypeEnum = z.nativeEnum(OrderType);

export const orderRouter = router({
  /**
   * MUTATION API: Create a new order.
   */
  createOrder: privateProcedure
    .input(
      z.object({
        type: OrderTypeEnum,
        totalPrice: z.number(),
        totalWithTax: z.number(),
        customerNote: z.string().nullish(),
        items: z.array(
          z.object({
            menuItemId: z.string(),
            quantity: z.number(),
            price: z.number(),
            customerNote: z.string().nullish(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { type, totalPrice, totalWithTax, customerNote, items } = input;

      if (!items || items.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Order must contain at least one item",
        });
      }

      let orderNumber = generateOrderNo();
      let existingOrderNo = await db.order.findUnique({
        where: { orderNumber },
      });

      while (!!existingOrderNo) {
        orderNumber = generateOrderNo();
        existingOrderNo = await db.order.findUnique({
          where: { orderNumber },
        });
      }

      await db.order.create({
        data: {
          orderNumber,
          type,
          totalPrice,
          totalWithTax,
          customerNote,
          items: {
            create: items,
          },
          owner: {
            connect: { id: ctx.user.id },
          },
        },
      });

      return true;
    }),
});
