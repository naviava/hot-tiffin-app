import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";
import { X } from "lucide-react";

interface Props {
  orderNumber: string;
  setOrderId: Dispatch<SetStateAction<string | null>>;
  isLoading: boolean;
  isSheet?: boolean;
}

export default function OrderPaymentHeader({
  orderNumber,
  setOrderId,
  isLoading,
  isSheet,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = useCallback(() => {
    setOrderId(null);
    const parsedUrl = qs.parseUrl(window.location.href);
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...parsedUrl.query,
          orderId: null,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  }, [pathname, router, setOrderId]);

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-muted-foreground">Order No.</p>
        <h3 className="text-xl font-bold">#{orderNumber}</h3>
      </div>
      {!isSheet && (
        <button
          type="button"
          disabled={isLoading}
          onClick={handleClick}
          className="flex items-center px-2 py-1 text-sm text-rose-500"
        >
          <X className="mr-1 h-4 w-4" />
          Close
        </button>
      )}
    </div>
  );
}
