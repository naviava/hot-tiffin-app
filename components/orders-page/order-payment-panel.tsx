"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { PaymentMethodType } from "@prisma/client";

import { useIsMounted } from "~/hooks/use-is-mounted";
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

export default function OrderPaymentPanel({ isSheet }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { isDesktop } = useMediaQuery();
  const searchParams = useSearchParams();

  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("CASH");

  useEffect(() => setOrderId(searchParams.get("orderId")), [searchParams]);

  const { data: order } = trpc.order.getOrderById.useQuery({ id: orderId });

  const { mutate: updateOrderStatus, isLoading } =
    trpc.order.updateOrderStatus.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: () => {
        toast.success("Order marked as paid");
        router.push(pathname);
      },
    });

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {!!order && (
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
            <OrderPaymentHeader
              orderNumber={order.orderNumber}
              setOrderId={setOrderId}
              isLoading={isLoading}
              isSheet={isSheet}
            />
            <PaymentMethodSelector
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              isLoading={isLoading}
              isPaid={order.isPaid}
              orderPaymentMethod={order.paymentMethod}
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
          {!order.isPaid ? (
            <Button
              variant="theme"
              disabled={isLoading}
              onClick={() =>
                updateOrderStatus({
                  id: order.id,
                  status: "COMPLETED",
                  paymentMethod: paymentMethod,
                })
              }
              className="text-lg font-semibold"
            >
              Mark as Paid
            </Button>
          ) : (
            <div className="flex items-center justify-center text-lg font-bold text-emerald-600">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>Order Paid</span>
            </div>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
