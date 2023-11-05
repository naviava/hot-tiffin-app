"use client";

import { use, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";

import CategoryFilterSkeleton from "~/components/loading-states/category-filter-skeleton";

import { cn } from "~/lib/utils";
import { trpc } from "~/app/_trpc/client";

interface Props {}

// TODO: Change category schema to include icon.
const categoryIconMap = [
  { icon: "🍟", name: "Appetizers" },
  { icon: "🍔", name: "Main Course" },
  { icon: "🍨", name: "Desserts" },
  { icon: "🥤", name: "Beverages" },
  { icon: "🍕", name: "Specials" },
  { icon: "👶", name: "Kids" },
  { icon: "🥗", name: "Vegetarian" },
  { icon: "🥦", name: "Vegan" },
];

export default function CategoryFilter({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const categoryId = useMemo(
    () => searchParams.get("category"),
    [searchParams],
  );

  const { data: categories, isFetching } = trpc.list.getCategories.useQuery();

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [categoryId]);

  const handleClick = useCallback(
    (categoryId: string) => {
      setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));

      const url = qs.stringifyUrl(
        {
          url: pathname,
          query: {
            category: selectedCategory === categoryId ? null : categoryId,
          },
        },
        { skipEmptyString: true, skipNull: true },
      );

      router.push(url);
    },
    [pathname, selectedCategory, router],
  );

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;
  if (isFetching) return <CategoryFilterSkeleton />;
  if (!categories) return null;

  return (
    <>
      <div className="flex flex-wrap gap-x-2 gap-y-4 md:gap-4">
        {categories?.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => handleClick(category.id)}
            className={cn(
              "flex shrink-0 grow-0 items-center rounded-full bg-neutral-500/10 px-4 py-2 font-medium text-muted-foreground",
              selectedCategory === category.id &&
                "bg-theme/10 font-bold text-theme",
            )}
          >
            <div className="mr-2">
              {
                categoryIconMap.find((item) => item.name === category.name)
                  ?.icon
              }
            </div>
            {category.name}
          </button>
        ))}
      </div>
    </>
  );
}
