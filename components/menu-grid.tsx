"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import MenuItem from "~/components/menu-item";

import { trpc } from "~/app/_trpc/client";
import MenuGridSkeleton from "./loading-states/menu-grid-skeleton";

export default function MenuGrid() {
  const searchParams = useSearchParams();

  const searchTerm = useMemo(() => searchParams.get("search"), [searchParams]);

  const categoryId = useMemo(
    () => searchParams.get("category"),
    [searchParams],
  );

  const { data: menuItems, isFetching } = trpc.menu.getMenuItems.useQuery({
    searchTerm,
    categoryId,
  });

  if (isFetching) return <MenuGridSkeleton />;

  if (!isFetching && (!menuItems || menuItems.length === 0))
    return (
      <div className="flex flex-col items-center justify-center gap-y-8">
        <div>Illustration</div>
        <span className="font-medium text-muted-foreground">
          No items matching that criteria
        </span>
      </div>
    );

  return (
    <div className="grid shrink-0 grid-cols-1 place-content-center place-items-center gap-x-8 gap-y-20 py-10 md:grid-cols-2 lg:grid-cols-3">
      {menuItems?.map((item) => (
        <MenuItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          category={item.category.name}
          imageUrl={item.image || "/menu-item-placeholder-image.jpg"}
          favCount={item.favourites.length}
        />
      ))}
    </div>
  );
}
