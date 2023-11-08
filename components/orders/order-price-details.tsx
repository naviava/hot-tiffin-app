import { useOrderStore } from "~/store/use-order-store";

export default function OrderPriceDetails() {
  const { getTotalQuantity, getTotalPrice, getTotalWithTax } = useOrderStore();

  return (
    <div className="space-y-2 pt-2">
      <div className="flex items-center justify-between">
        <h5 className="text-muted-foreground">Items ({getTotalQuantity()})</h5>
        <p className="font-bold">
          ${getTotalPrice().toFixed(2).replace(".", ",")}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <h5 className="text-muted-foreground">Tax (18%)</h5>
        <p className="font-bold">
          ${(getTotalPrice() * 0.18).toFixed(2).replace(".", ",")}
        </p>
      </div>
      <div className="border-b border-dashed border-gray-400 py-1" />
      <div className="flex items-center justify-between py-2">
        <h5 className="text-muted-foreground">Total</h5>
        <p className="font-extrabold">
          ${getTotalWithTax().toFixed(2).replace(".", ",")}
        </p>
      </div>
    </div>
  );
}
