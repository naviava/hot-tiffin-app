import { OrderType } from "@prisma/client";
import { useOrderStore } from "~/store/use-order-store";
import { cn } from "~/lib/utils";

interface Props {
  isLoading: boolean;
}

export default function OrderTypeSelector({ isLoading }: Props) {
  const { orderType, setOrderType } = useOrderStore();

  return (
    <div className="flex items-center gap-4">
      {Object.values(OrderType).map((type, idx) => (
        <button
          key={idx}
          type="button"
          disabled={isLoading}
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
  );
}
