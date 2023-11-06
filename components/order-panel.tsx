"use client";

import { useCallback } from "react";

import { X } from "lucide-react";

import { OrderType } from "@prisma/client";

import { useOrderStore } from "~/hooks/use-order-store";
import { useMediaQuery } from "~/hooks/use-media-query";

import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import OrderPanelItem from "~/components/order-panel-item";
import OrderPriceDetails from "~/components/order-price-details";

import { cn } from "~/lib/utils";

interface Props {}

export default function OrderPanel({}: Props) {
  const { isDesktop } = useMediaQuery();
  const { items, orderType, setOrderType, clearOrder, getTotalQuantity } =
    useOrderStore();

  const handleCreateOrder = useCallback(() => {}, []);

  return (
    <section
      className={cn(
        "my-4 mr-4 hidden h-fit flex-col bg-white px-6 py-6 xl:flex xl:max-w-sm xl:flex-1",
        isDesktop && "rounded-[2rem] shadow-lg",
        items.length === 0 && "xl:hidden",
      )}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">Current Order</p>
            <h3 className="text-xl font-bold">{getTotalQuantity()} items</h3>
          </div>
          <button
            type="button"
            onClick={clearOrder}
            className="flex items-center px-2 py-1 text-sm text-rose-500"
          >
            <X className="mr-1 h-4 w-4" />
            Clear
          </button>
        </div>
        <div className="flex items-center gap-4">
          {Object.values(OrderType).map((type, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setOrderType(type)}
              className={cn(
                "select-none rounded-full bg-neutral-100 px-4 py-1 text-sm font-medium capitalize text-muted-foreground transition duration-300 active:scale-95",
                orderType === type && "bg-theme font-bold text-white",
              )}
            >
              {type.replaceAll("_", " ").toLowerCase()}
            </button>
          ))}
        </div>
        <ScrollArea className="h-[calc(100vh-25rem)]">
          <div className="space-y-4 py-1">
            {items.map((item) => (
              <OrderPanelItem key={item.id} {...item} />
            ))}
          </div>
        </ScrollArea>
        <OrderPriceDetails />
      </div>
      <Button
        variant="theme"
        onClick={handleCreateOrder}
        className="text-lg font-semibold"
      >
        Place Order
      </Button>
    </section>
  );
}
