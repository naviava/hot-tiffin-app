"use client";

import { ShoppingCart } from "lucide-react";

import { useOrderStore } from "~/store/use-order-store";

import OrderPanel from "~/components/orders/order-panel";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

interface Props {}

export default function MobileOrderCheckout({}: Props) {
  const { items, getTotalQuantity } = useOrderStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="translate-x-20 px-2 md:translate-x-0 xl:hidden"
        >
          <ShoppingCart className="h-7 w-7 text-muted-foreground" />
          {items.length > 0 && (
            <div className="absolute right-0 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-theme text-sm font-bold text-white">
              {getTotalQuantity()}
            </div>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="px-0 md:p-6">
        {items.length > 0 ? (
          <OrderPanel isSheet />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-y-6">
            <div>Illustration</div>
            <p>Add some items to the order</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
