import { Trash2 } from "lucide-react";
import { useOrderStore } from "~/store/use-order-store";

interface Props {
  id: string;
  name: string;
  disabled: boolean;
}

export default function OrderItemHeader({ id, name, disabled }: Props) {
  const { removeFromOrder } = useOrderStore();

  return (
    <div className="flex items-center justify-between gap-x-2">
      <h3 className="line-clamp-1 overflow-hidden text-lg font-bold">{name}</h3>
      <button
        type="button"
        disabled={disabled}
        onClick={() => removeFromOrder(id)}
        className="mr-6"
      >
        <Trash2 className="h-4 w-4 text-rose-500" />
      </button>
    </div>
  );
}
