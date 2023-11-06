"use client";

import { useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { Check, Minus, PencilLine, Plus, Trash, Trash2, X } from "lucide-react";

import { useOrderStore } from "~/hooks/use-order-store";

import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface Props {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  customerNote?: string;
}

export default function OrderPanelItem({
  id,
  name,
  price,
  quantity,
  imageUrl,
  customerNote,
}: Props) {
  const [inputValue, setInputValue] = useState(customerNote ?? "");
  const [isEditingNote, setIsEditingNote] = useState(false);

  const {
    increaseQuantity,
    decreaseQuantity,
    setCustomerNote,
    removeFromOrder,
  } = useOrderStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <div className="flex gap-x-4">
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
          <div className="flex items-center justify-between gap-x-2">
            <h3 className="line-clamp-1 overflow-hidden text-lg font-bold">
              {name}
            </h3>
            <button
              type="button"
              onClick={() => removeFromOrder(id)}
              className="mr-6"
            >
              <Trash2 className="h-4 w-4 text-rose-500" />
            </button>
          </div>
          {isEditingNote ? (
            <motion.div className="flex items-center gap-x-2">
              <input
                type="text"
                maxLength={150}
                value={inputValue}
                onChange={(evt) => setInputValue(evt.target.value)}
                className="w-[70%] rounded-lg border border-neutral-200 px-2 py-1 text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <button
                className="rounded-full bg-rose-500 p-1"
                onClick={() => {
                  setInputValue(customerNote ?? "");
                  setIsEditingNote(false);
                }}
              >
                <X className="h-4 w-4 text-white" />
              </button>
              <button
                className="rounded-full bg-emerald-500 p-1"
                onClick={() => {
                  setCustomerNote(id, inputValue);
                  setIsEditingNote(false);
                }}
              >
                <Check className="h-4 w-4 text-white" />
              </button>
            </motion.div>
          ) : (
            <div className="text-sm text-muted-foreground">
              {!!customerNote ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <p className="line-clamp-1 cursor-default">
                        Note: {customerNote}
                      </p>
                    </TooltipTrigger>
                    {customerNote.length > 20 && (
                      <TooltipContent className="max-w-xs">
                        <p>{customerNote}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <span className="text-xs font-medium italic">
                  No note added
                </span>
              )}
            </div>
          )}
          <h4 className="text-sm font-bold">${price}</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <button
                type="button"
                onClick={() => decreaseQuantity(id)}
                className="rounded-full bg-neutral-100 p-1"
              >
                <Minus className="h-4 w-4 text-muted-foreground" />
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => increaseQuantity(id)}
                className="rounded-full bg-neutral-100 p-1"
              >
                <Plus className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            {!isEditingNote && (
              <button
                type="button"
                onClick={() => setIsEditingNote(true)}
                className="mr-4 rounded-full bg-neutral-100 px-2 py-1"
              >
                <PencilLine className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>
      <Separator className="mt-4" />
    </motion.div>
  );
}
