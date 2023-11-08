"use client";

import { useState } from "react";
import Image from "next/image";

import { PencilLine } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";

import { Separator } from "~/components/ui/separator";
import OrderItemNote from "~/components/order-panel/order-item-note";
import OrderItemHeader from "~/components/order-panel/order-item-header";
import OrderItemNoteEditor from "~/components/order-panel/order-item-note-editor";
import OrderQuantityButtons from "~/components/order-panel/order-quantity-buttons";

const animationVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { type: "tween" } },
  exit: { opacity: 0, x: 20 },
};

interface Props {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  customerNote?: string | null;
  disabled?: boolean;
}

export default function OrderPanelItem({
  id,
  name,
  price,
  quantity,
  imageUrl,
  customerNote,
  disabled = false,
}: Props) {
  const [isEditingNote, setIsEditingNote] = useState(false);

  return (
    <motion.div
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div layout className="flex gap-x-4">
        <div className="flex h-[60px] w-[60px] shrink-0 content-center items-center justify-center rounded-2xl bg-theme/20">
          <Image
            src={imageUrl ?? "/menu-item-placeholder-image.jpg"}
            alt={name}
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
        </div>
        <div className="w-full space-y-1">
          <OrderItemHeader id={id} name={name} isPaymentPage />
          <div className="text-sm text-muted-foreground">
            <OrderItemNote customerNote={customerNote} />
          </div>
          {/* Item price. */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <p className="text-sm font-medium">
                ${price.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-xs">x {quantity}</p>
            </div>
            <h4 className="mr-4 font-bold">
              {(price * quantity).toFixed(2).replace(".", ",")}
            </h4>
          </div>
        </div>
      </motion.div>
      <motion.div layout>
        <Separator className="mt-4" />
      </motion.div>
    </motion.div>
  );
}
