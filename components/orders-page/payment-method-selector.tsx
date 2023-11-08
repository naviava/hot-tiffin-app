import { PaymentMethodType } from "@prisma/client";
import { cn } from "~/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface Props {
  paymentMethod: PaymentMethodType;
  setPaymentMethod: Dispatch<SetStateAction<PaymentMethodType>>;
  isLoading: boolean;
}

export default function PaymentMethodSelector({
  paymentMethod,
  setPaymentMethod,
  isLoading,
}: Props) {
  return (
    <div className="flex items-center gap-4">
      {Object.values(PaymentMethodType).map((method, idx) => (
        <button
          key={idx}
          type="button"
          disabled={isLoading}
          onClick={() => setPaymentMethod(method)}
          className={cn(
            "select-none rounded-full bg-neutral-100 px-4 py-1 text-sm font-medium capitalize text-muted-foreground transition duration-300 active:scale-95",
            paymentMethod === method && "bg-theme font-bold text-white",
          )}
        >
          {method.replaceAll("_", "-").toLowerCase()}
        </button>
      ))}
    </div>
  );
}
