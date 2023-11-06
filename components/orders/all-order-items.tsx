import { AnimatePresence } from "framer-motion";

import { useOrderStore } from "~/hooks/use-order-store";

import OrderItem from "~/components/orders/order-item";
import { ScrollArea } from "~/components/ui/scroll-area";

interface Props {
  isLoading: boolean;
}

export default function AllOrderItems({ isLoading }: Props) {
  const { items } = useOrderStore();

  return (
    <ScrollArea className="h-[calc(100vh-25rem)]">
      <div className="space-y-4 py-1">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <OrderItem key={item.id} {...item} disabled={isLoading} />
          ))}
        </AnimatePresence>
      </div>
    </ScrollArea>
  );
}
