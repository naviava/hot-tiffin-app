"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";

import { OrderStatus } from "@prisma/client";

import { cn } from "~/lib/utils";

interface Props {}

export default function CategoryFilter({}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedOrderStatus, setSelectedOrderStatus] =
    useState<OrderStatus>("NEW");

  const handleClick = useCallback(
    (status: OrderStatus) => {
      if (selectedOrderStatus === status) return;

      setSelectedOrderStatus(status);

      const url = qs.stringifyUrl(
        {
          url: pathname,
          query: {
            orderStatus: status,
          },
        },
        { skipEmptyString: true, skipNull: true },
      );
      router.push(url);
    },
    [pathname, router, selectedOrderStatus],
  );

  useEffect(() => {
    if (selectedOrderStatus === "NEW") {
      const parsedUrl = qs.parseUrl(window.location.href);

      const url = qs.stringifyUrl(
        {
          url: pathname,
          query: {
            ...parsedUrl.query,
            orderStatus: undefined,
          },
        },
        { skipEmptyString: true, skipNull: true },
      );
      router.push(url);
    }
  }, [pathname, router, selectedOrderStatus]);

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-4 md:gap-4">
      {Object.values(OrderStatus).map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => handleClick(status)}
          className={cn(
            "flex shrink-0 grow-0 items-center rounded-full bg-neutral-500/10 px-4 py-2 font-medium text-muted-foreground",
            selectedOrderStatus === status &&
              "bg-theme/10 font-bold text-theme",
          )}
        >
          <span className="capitalize">
            {status.toLowerCase().replaceAll("_", " ")}
          </span>
        </button>
      ))}
    </div>
  );
}
