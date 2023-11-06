"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

import { useOrderStore } from "~/hooks/use-order-store";

interface Props {
  id: string;
  quantity: number;
  disabled?: boolean;
}

export default function OrderQuantityButtons({
  id,
  quantity,
  disabled,
}: Props) {
  const { increaseQuantity, decreaseQuantity } = useOrderStore();

  return (
    <motion.div
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.7 }}
      className="flex items-center gap-x-2"
    >
      <button
        type="button"
        disabled={disabled}
        onClick={(evt) => {
          evt.stopPropagation();
          decreaseQuantity(id);
        }}
        className="rounded-full bg-neutral-100 p-1 transition active:scale-90"
      >
        <Minus className="h-4 w-4 text-muted-foreground" />
      </button>
      <span>{quantity}</span>
      <button
        type="button"
        disabled={disabled}
        onClick={(evt) => {
          evt.stopPropagation();
          increaseQuantity(id);
        }}
        className="rounded-full bg-neutral-100 p-1 transition active:scale-90"
      >
        <Plus className="h-4 w-4 text-muted-foreground" />
      </button>
    </motion.div>
  );
}
