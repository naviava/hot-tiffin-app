"use client";

import { ChangeEvent, useEffect, useState } from "react";

import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounce } from "usehooks-ts";

import { Input } from "~/components/ui/input";

import { cn } from "~/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  placeholder?: string;
  className?: string;
}

export default function SearchInput({ placeholder, className }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const parsedUrl = qs.parseUrl(window.location.href);

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...parsedUrl.query,
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  }, [pathname, router, debouncedValue]);

  return (
    <div className="relative flex w-fit">
      <Input
        placeholder={placeholder}
        onChange={(evt: ChangeEvent<HTMLInputElement>) =>
          setValue(evt.target.value)
        }
        className={cn("w-[15rem] bg-white py-2 md:w-[25rem]", className)}
      />
      <button type="button">
        <Search className="absolute right-4 top-[50%] -translate-y-1/2 text-muted-foreground" />
      </button>
    </div>
  );
}
