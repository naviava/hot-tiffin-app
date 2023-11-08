import { X } from "lucide-react";
import { useOrderStore } from "~/store/use-order-store";

interface Props {
  isLoading: boolean;
}

export default function OrderHeader({ isLoading }: Props) {
  const { getTotalQuantity, clearOrder } = useOrderStore();

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-muted-foreground">Current Order</p>
        <h3 className="text-xl font-bold">{getTotalQuantity()} items</h3>
      </div>
      <button
        type="button"
        disabled={isLoading}
        onClick={clearOrder}
        className="flex items-center px-2 py-1 text-sm text-rose-500"
      >
        <X className="mr-1 h-4 w-4" />
        Clear
      </button>
    </div>
  );
}
