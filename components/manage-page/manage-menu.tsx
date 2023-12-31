import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { BsFillTrash3Fill } from "react-icons/bs";

import { useMenuItemModal } from "~/hooks/use-menu-item-modal";

import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { DeleteItemModal } from "~/components/modals/delete-item-modal";

import { trpc } from "~/app/_trpc/client";

export function ManageMenu() {
  const { onOpen: openEditModal } = useMenuItemModal();

  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const categoryId = searchParams.get("category");

  const { data: menuItems, isFetching } = trpc.menu.getMenuItems.useQuery({
    categoryId,
    query,
  });

  if ((!menuItems || menuItems.length === 0) && !isFetching)
    return (
      <div className="pt-24 text-center text-muted-foreground">
        No items found
      </div>
    );

  if (isFetching) return <ManageMenuSkeleton />;

  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
      {menuItems?.map((item) => (
        <div
          key={item.id}
          role="button"
          onClick={() => openEditModal(item.id)}
          className="flex gap-x-2"
        >
          <div className="relative my-auto h-[100px] w-[100px]">
            <Image
              fill
              src={item.image || "/menu-item-placeholder-image.jpg"}
              alt={item.name}
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="line-clamp-1 text-lg font-medium">{item.name}</h2>
              <div className="flex items-center">
                <DeleteItemModal id={item.id}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                    className="group w-auto hover:bg-transparent"
                  >
                    <BsFillTrash3Fill className="h-5 w-5 text-muted-foreground transition group-hover:text-rose-500" />
                  </Button>
                </DeleteItemModal>
              </div>
            </div>
            <p className="font-semibold text-theme">
              ${item.price.toFixed(2).toString().replace(".", ",")}
            </p>
            <p className="line-clamp-2 text-sm text-neutral-500">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ManageMenuSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
      {Array(4)
        .fill(null)
        .map((_, idx) => (
          <div key={idx} className="flex gap-x-2">
            <Skeleton className="my-auto h-[100px] w-[100px] bg-neutral-200" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-64 bg-neutral-200" />
                <Skeleton className="mr-2 h-6 w-6 bg-neutral-200" />
              </div>
              <Skeleton className="mt-2 h-6 w-16 bg-neutral-200" />
              <Skeleton className="mt-2 h-4 w-full bg-neutral-200" />
              <Skeleton className="mt-1 h-4 w-[97%] bg-neutral-200" />
            </div>
          </div>
        ))}
    </div>
  );
}
