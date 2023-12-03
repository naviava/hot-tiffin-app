import { useMenuItemModal } from "~/hooks/use-menu-item-modal";

import { Dialog, DialogContent } from "~/components/ui/dialog";
import { EditItem } from "~/components/menu-item-form/edit-item";

import { trpc } from "~/app/_trpc/client";

export function MenuItemModal() {
  const id = useMenuItemModal((state) => state.id);
  const isOpen = useMenuItemModal((state) => state.isOpen);
  const onClose = useMenuItemModal((state) => state.onClose);

  const { data: item } = trpc.menu.getMenuItemById.useQuery(id, {
    enabled: isOpen,
  });

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <EditItem itemId={item?.id} />
      </DialogContent>
    </Dialog>
  );
}
