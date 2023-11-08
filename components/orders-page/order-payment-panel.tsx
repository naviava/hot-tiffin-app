"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

import { PaymentMethodType } from "@prisma/client";

import { useMediaQuery } from "~/hooks/use-media-query";

import { Button } from "~/components/ui/button";
import OrderPaymentHeader from "~/components/orders-page/order-payment-header";
import AllOrderPaymentItems from "~/components/orders-page/all-order-payment-items";
import PaymentMethodSelector from "~/components/orders-page/payment-method-selector";
import OrderPaymentPriceDetails from "~/components/orders-page/order-payment-price-details";

import { cn } from "~/lib/utils";
import { trpc } from "~/app/_trpc/client";

interface Props {
  isSheet?: boolean;
}

// TODO: Change isLoading states from false to mutation state.
export default function OrderPaymentPanel({ isSheet }: Props) {
  const { isDesktop } = useMediaQuery();
  const searchParams = useSearchParams();

  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("CASH");

  useEffect(() => setOrderId(searchParams.get("orderId")), [searchParams]);

  const { data: order } = trpc.order.getOrderById.useQuery({ id: orderId });

  return (
    <AnimatePresence>
      {!!order && (
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className={cn(
            "sticky my-4 mr-4 flex h-fit w-[20rem] flex-col bg-white px-6 py-6",
            !isSheet && "hidden w-[20rem] xl:flex",
            isDesktop && "rounded-[2rem] shadow-lg",
          )}
        >
          <div className="space-y-4">
            <OrderPaymentHeader
              orderNumber={order.orderNumber}
              setOrderId={setOrderId}
              isLoading={false}
              isSheet={isSheet}
            />
            <PaymentMethodSelector
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              isLoading={false}
            />
            <AllOrderPaymentItems orderId={order.id} />
            <OrderPaymentPriceDetails
              totalQuantity={order.items.reduce(
                (total, item) => total + item.quantity,
                0,
              )}
              totalPrice={order.totalPrice}
              totalWithTax={order.totalWithTax}
            />
          </div>
          <Button
            variant="theme"
            disabled={false}
            onClick={() => {}}
            className="text-lg font-semibold"
          >
            Mark as Paid
          </Button>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
