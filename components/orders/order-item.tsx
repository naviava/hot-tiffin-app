"use client";

import { useState } from "react";
import Image from "next/image";

import { PencilLine } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";

import { Separator } from "~/components/ui/separator";
import OrderItemNote from "~/components/orders/order-item-note";
import OrderItemHeader from "~/components/orders/order-item-header";
import OrderItemNoteEditor from "~/components/orders/order-item-note-editor";
import OrderQuantityButtons from "~/components/orders/order-quantity-buttons";

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
  customerNote?: string;
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
          <OrderItemHeader id={id} name={name} disabled={disabled} />
          <AnimatePresence mode="popLayout">
            {isEditingNote ? (
              <motion.div
                key="editing-note"
                variants={animationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex items-center gap-x-2"
              >
                <OrderItemNoteEditor
                  id={id}
                  customerNote={customerNote}
                  setIsEditingNote={setIsEditingNote}
                />
              </motion.div>
            ) : (
              <motion.div
                key="not-editing-note"
                variants={animationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-sm text-muted-foreground"
              >
                <OrderItemNote customerNote={customerNote} />
              </motion.div>
            )}
          </AnimatePresence>
          {/* Item price. */}
          <motion.h4 layout className="text-sm font-bold">
            ${(price * quantity).toFixed(2)}
          </motion.h4>
          <motion.div layout className="flex items-center justify-between">
            <OrderQuantityButtons
              id={id}
              quantity={quantity}
              disabled={disabled}
            />
            {!isEditingNote && (
              <button
                type="button"
                disabled={disabled}
                onClick={() => setIsEditingNote(true)}
                className="mr-4 rounded-full bg-neutral-100 px-2 py-1"
              >
                <PencilLine className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>
      <Separator className="mt-4" />
    </motion.div>
  );
}
