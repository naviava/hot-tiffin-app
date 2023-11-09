"use client";

import { Fragment } from "react";

import { useIsMounted } from "~/hooks/use-is-mounted";
import { useMediaQuery } from "~/hooks/use-media-query";

import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import OrderListItem from "~/components/orders-page/order-list-item";

import { serverClient } from "~/app/_trpc/server-client";
import OrderPaymentPanel from "./order-payment-panel";

interface Props {
  orders: Awaited<ReturnType<typeof serverClient.order.getAllOrders>>;
}

export default function OrdersList({ orders }: Props) {
  const { isDesktop } = useMediaQuery();

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <ul className="space-y-6">
      {orders.map((order) => (
        <Fragment key={order.id}>
          {isDesktop ? (
            <OrderListItem
              id={order.id}
              orderNumber={order.orderNumber}
              orderType={order.type}
              totalQuantity={order.items.reduce(
                (total, item) => total + item.quantity,
                0,
              )}
              totalWithTax={order.totalWithTax}
              createdAt={order.createdAt}
            />
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <div>
                  <OrderListItem
                    id={order.id}
                    orderNumber={order.orderNumber}
                    orderType={order.type}
                    totalQuantity={order.items.reduce(
                      (total, item) => total + item.quantity,
                      0,
                    )}
                    totalWithTax={order.totalWithTax}
                    createdAt={order.createdAt}
                  />
                </div>
              </SheetTrigger>
              <SheetContent side="right" className="px-0 md:p-6">
                <OrderPaymentPanel isSheet />
              </SheetContent>
            </Sheet>
          )}
        </Fragment>
      ))}
    </ul>
  );
}
