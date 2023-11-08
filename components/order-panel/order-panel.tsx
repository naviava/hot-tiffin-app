"use client";

import { useCallback, useEffect, useState } from "react";

import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

import { useOrderStore } from "~/store/use-order-store";
import { useMediaQuery } from "~/hooks/use-media-query";

import { Button } from "~/components/ui/button";
import OrderHeader from "~/components/order-panel/order-header";
import AllOrderItems from "~/components/order-panel/all-order-items";
import OrderTypeSelector from "~/components/order-panel/order-type-selector";
import OrderPriceDetails from "~/components/order-panel/order-price-details";

import { cn } from "~/lib/utils";
import { trpc } from "~/app/_trpc/client";

interface Props {
  isSheet?: boolean;
}

export default function OrderPanel({ isSheet }: Props) {
  const { isDesktop } = useMediaQuery();

  const { items, orderType, clearOrder, getTotalPrice, getTotalWithTax } =
    useOrderStore();

  const [isOrderEmpty, setIsOrderEmpty] = useState(items.length === 0);
  useEffect(() => setIsOrderEmpty(items.length === 0), [items]);

  const { mutate: createOrder, isLoading } = trpc.order.createOrder.useMutation(
    {
      onError: ({ message }) => toast.error(message),
      onSuccess: () => {
        clearOrder();
        toast.success("Order created successfully!");
      },
    },
  );

  const handleCreateOrder = useCallback(() => {
    createOrder({
      items: items.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
        price: item.price * item.quantity,
        customerNote: item.customerNote,
      })),
      type: orderType,
      totalPrice: getTotalPrice(),
      totalWithTax: getTotalWithTax(),
    });
  }, [createOrder, items, orderType, getTotalPrice, getTotalWithTax]);

  return (
    <AnimatePresence>
      {!isOrderEmpty && (
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className={cn(
            "my-4 mr-4 flex h-fit w-[20rem] flex-col bg-white px-6 py-6",
            !isSheet && "hidden w-[20rem] xl:flex",
            isDesktop && "rounded-[2rem] shadow-lg",
          )}
        >
          <div className="space-y-4">
            <OrderHeader isLoading={isLoading} />
            <OrderTypeSelector isLoading={isLoading} />
            <AllOrderItems isLoading={isLoading} />
            <OrderPriceDetails />
          </div>
          <Button
            variant="theme"
            disabled={isLoading}
            onClick={handleCreateOrder}
            className="text-lg font-semibold"
          >
            Place Order
          </Button>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
