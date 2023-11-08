import * as z from "zod";

import { OrderStatus, OrderType } from "@prisma/client";

import { db } from "~/lib/db";
import { generateOrderNo } from "~/lib/generate-order-no";
import {
  publicProcedure,
  router,
  staffProcedure,
  privateProcedure,
} from "~/server/trpc";
import { TRPCError } from "@trpc/server";

export const orderRouter = router({
  /**
   * MUTATION API: Create a new order.
   */
  createOrder: privateProcedure
    .input(
      z.object({
        type: z.nativeEnum(OrderType),
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

  /**
   * QUERY API: Get all orders. Takes an optional
   * status parameter to filter by order status.
   */
  getAllOrders: staffProcedure
    .input(z.object({ status: z.nativeEnum(OrderStatus).nullish() }))
    .query(async ({ ctx, input }) => {
      const { status } = input;

      const orders = await db.order.findMany({
        where: {
          status: status ? { equals: status } : "NEW",
        },
        include: {
          items: true,
          owner: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return orders ?? [];
    }),

  /**
   * QUERY API: Get order by ID.
   */
  getOrderById: staffProcedure
    .input(z.object({ id: z.string().nullish() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;

      if (!id) return null;

      const order = await db.order.findUnique({
        where: { id },
        include: {
          items: {
            include: { menuItem: true },
          },
          owner: true,
        },
      });

      return order ?? null;
    }),
});
