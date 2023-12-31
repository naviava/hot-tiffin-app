"use client";

import { useCallback } from "react";
import Image from "next/image";

import { Info } from "lucide-react";
import { FcLike } from "react-icons/fc";
import { AnimatePresence } from "framer-motion";

import { useOrderStore } from "~/store/use-order-store";

import OrderQuantityButtons from "~/components/order-panel/order-quantity-buttons";
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
  imageUrl: string;
  category: string;
  favCount?: number;
}

export default function MenuItem({
  id,
  name,
  price,
  imageUrl,
  category,
  favCount,
}: Props) {
  const { items, addToOrder } = useOrderStore();

  const openItemDetails = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement>) => {
      // console.log(id);
    },
    [],
  );

  const isItemInOrder = items.find((item) => item.id === id);
  const quantity = !!isItemInOrder ? isItemInOrder.quantity : null;

  return (
    <div
      onClick={() => addToOrder({ id, name, quantity: 1, price, imageUrl })}
      className="flex w-[17rem] max-w-[90%] cursor-pointer select-none flex-col items-center rounded-[2rem] border-t-4 border-theme bg-white shadow-lg transition duration-500 md:hover:scale-105"
    >
      <Image
        src={imageUrl}
        alt={name}
        width={160}
        height={160}
        className="-translate-y-10 rounded-full object-cover"
      />
      <div className="-mt-6 mb-4 space-y-2">
        <div>
          <p className="text-center text-sm text-muted-foreground">
            {category}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h3 className="mx-4 line-clamp-1 text-center text-xl font-bold text-neutral-900">
                  {name}
                </h3>
              </TooltipTrigger>
              {name.length > 18 && (
                <TooltipContent align="center">
                  <p>{name}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-center text-xl font-bold text-theme">
          ${price.toFixed(2).toString().replace(".", ",")}
        </p>
      </div>
      <div className="mb-8 flex w-full items-center justify-between px-6">
        {/**
         * TODO: Add actual number of likes,
         * once user module is implemented.
         */}
        <div className="flex flex-shrink-0 items-center transition">
          <FcLike className="mr-2" />
          <span>{favCount}</span>
        </div>
        <AnimatePresence>
          {!!quantity && <OrderQuantityButtons id={id} quantity={quantity} />}
        </AnimatePresence>
        <button
          type="button"
          onClick={openItemDetails}
          className="text-muted-foreground transition hover:scale-110"
        >
          <Info className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
