import { AnimatePresence } from "framer-motion";

import { trpc } from "~/app/_trpc/client";

import { ScrollArea } from "~/components/ui/scroll-area";
import OrderPaymentItem from "~/components/orders-page/order-payment-item";

interface Props {
  orderId: string;
}

export default function AllOrderPaymentItems({ orderId }: Props) {
  const { data: order } = trpc.order.getOrderById.useQuery({ id: orderId });

  return (
    <ScrollArea className="h-[calc(100vh-27rem)]">
      <div className="space-y-4 py-1">
        <AnimatePresence mode="popLayout">
          {order?.items.map((item) => (
            <OrderPaymentItem
              key={item.id}
              id={item.id}
              name={item.menuItem.name}
              price={item.menuItem.price}
              quantity={item.quantity}
              imageUrl={
                item.menuItem.image || "/menu-item-placeholder-image.jpg"
              }
              customerNote={item.customerNote}
            />
          ))}
        </AnimatePresence>
      </div>
    </ScrollArea>
  );
}
