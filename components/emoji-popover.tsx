"use client";

import { ElementRef, memo, useCallback, useRef } from "react";

import { toast } from "sonner";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { trpc } from "~/app/_trpc/client";

interface Props {
  children: React.ReactNode;
  categoryId: string;
  categoryName: string;
}

export const EmojiPopover = memo(_EmojiPopover);
function _EmojiPopover({ children, categoryId, categoryName }: Props) {
  const closePopoverRef = useRef<ElementRef<"button">>(null);

  const utils = trpc.useUtils();
  const { mutate: updateCategory } = trpc.list.updateCategory.useMutation({
    onError: ({ message }) => toast.error(message),
    onSuccess: (data) => {
      utils.list.invalidate();
      toast.success(`Category "${categoryName}" emoji updated to ${data.icon}`);
    },
  });

  const handleSetEmoji = useCallback(
    (emojiData: EmojiClickData) => {
      updateCategory({
        id: categoryId,
        icon: emojiData.emoji,
        name: categoryName,
      });
      closePopoverRef.current?.click();
    },
    [categoryId, categoryName, updateCategory],
  );

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="border-none bg-transparent shadow-none">
        <EmojiPicker onEmojiClick={handleSetEmoji} />
        <PopoverClose ref={closePopoverRef}>
          <button className="sr-only hidden" />
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
