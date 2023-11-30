import { useMenuItemModal } from "~/hooks/use-menu-item-modal";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { trpc } from "~/app/_trpc/client";
import { z } from "zod";
import { EditItem } from "../menu-item-form/edit-item";

export function MenuItemModal() {
  const modal = useMenuItemModal();

  const { data: item } = trpc.menu.getMenuItemById.useQuery(modal.id);

  // TODO: Add loading state.
  if (!item) return <p>Loading...</p>;

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent>
        <EditItem itemId={item?.id} />
      </DialogContent>
    </Dialog>
  );
}
