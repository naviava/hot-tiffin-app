"use client";

import { CategoryItem } from "./category-item";
import { AddCategory } from "./add-category";

import { cn } from "~/lib/utils";
import { trpc } from "~/app/_trpc/client";

interface Props {
  className?: string;
}

export function ManageCategories({ className }: Props) {
  const { data: categories, isFetching } = trpc.list.getCategories.useQuery();

  if (isFetching) return <div>Loading...</div>;

  return (
    <div className={cn("max-w-xl space-y-4", className)}>
      {!!categories &&
        categories.length > 0 &&
        categories.map((category) => (
          <CategoryItem
            key={category.id}
            id={category.id}
            name={category.name}
            icon={category.icon}
          />
        ))}
      <AddCategory />
    </div>
  );
}
