"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

import qs from "query-string";
import { format } from "date-fns";

import { OrderType } from "@prisma/client";

import { Badge } from "~/components/ui/badge";
import { motion } from "framer-motion";

interface Props {
  id: string;
  orderNumber: string;
  createdAt: Date;
  totalQuantity: number;
  totalWithTax: number;
  orderType: OrderType;
}

export default function OrderListItem({
  id,
  orderNumber,
  orderType,
  totalQuantity,
  totalWithTax,
  createdAt,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = useCallback(
    (orderId: string) => {
      const parsedUrl = qs.parseUrl(window.location.href);
      const url = qs.stringifyUrl(
        {
          url: pathname,
          query: {
            ...parsedUrl.query,
            orderId,
          },
        },
        { skipEmptyString: true, skipNull: true },
      );

      router.push(url);
    },
    [pathname, router],
  );

  return (
    <li
      key={id}
      onClick={() => handleClick(id)}
      className="grid flex-1 cursor-pointer grid-cols-2 rounded-2xl bg-white p-4"
    >
      <div>
        <h2 className="text-lg font-extrabold lg:text-xl">
          <span className="mr-1 hidden md:inline-block">Order: </span>#
          {orderNumber}
        </h2>
        <p className="text-sm text-muted-foreground">
          {format(createdAt, "MMM d, yyyy")}
        </p>
        <p className="mt-1">Items: {totalQuantity}</p>
      </div>
      <div className="flex flex-col items-end justify-start gap-y-4">
        <p className="text-lg font-medium text-muted-foreground">
          {format(createdAt, "h:mm aaa")}
        </p>
        <div className="flex items-center gap-x-4">
          <p className="text-lg font-extrabold lg:text-xl">
            ${totalWithTax.toFixed(2).replace(".", ",")}
          </p>
          <Badge className="bg-emerald-500 capitalize hover:bg-emerald-500">
            {orderType.toLowerCase().replaceAll("_", " ")}
          </Badge>
        </div>
      </div>
    </li>
  );
}
