"use client";

import { trpc } from "~/app/_trpc/client";
import { CategoryItem } from "./category-item";

export function ManageCategories() {
  const { data: categories, isFetching } = trpc.list.getCategories.useQuery();

  if (isFetching) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-xl space-y-4">
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
    </div>
  );
}
