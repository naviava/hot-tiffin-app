"use client";

import { useIsMounted } from "~/hooks/use-is-mounted";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { trpc } from "~/app/_trpc/client";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
  id: string;
}

export function DeleteItemModal({ children, id }: Props) {
  const utils = trpc.useUtils();

  const { mutate: handleDeleteItem, isLoading } =
    trpc.menu.deleteMenuItem.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: () => {
        utils.menu.invalidate();
        toast.success("Item deleted");
      },
    });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isLoading}
            onClick={(e) => e.stopPropagation()}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteItem(id);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
