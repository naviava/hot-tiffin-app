"use client";

import { useIsMounted } from "~/hooks/use-is-mounted";

import { MenuItemModal } from "~/components/modals/menu-item-modal";

export function ModalProvider() {
  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <>
      <MenuItemModal />
    </>
  );
}
