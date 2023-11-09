import { PaymentMethodType } from "@prisma/client";
import { cn } from "~/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface Props {
  paymentMethod: PaymentMethodType;
  setPaymentMethod: Dispatch<SetStateAction<PaymentMethodType>>;
  isPaid: boolean;
  isLoading: boolean;
  orderPaymentMethod: PaymentMethodType;
}

export default function PaymentMethodSelector({
  paymentMethod,
  setPaymentMethod,
  isPaid,
  orderPaymentMethod,
  isLoading,
}: Props) {
  return (
    <div className="flex items-center gap-4">
      {isPaid ? (
        <p className="text-sm text-muted-foreground">
          Payment method:{" "}
          <span className="capitalize">
            {orderPaymentMethod.toLowerCase().replaceAll("_", "-")}
          </span>
        </p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
