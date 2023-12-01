import { forwardRef, memo } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { EmojiPopover } from "~/components/emoji-popover";
import { CategorySchemaType } from "./category-item";

interface Props {
  id: string;
  name: string;
  icon: string | null;
  form: CategorySchemaType;
  isEditing: boolean;
  enableEditing: () => void;
}

const _CategoryInfo = forwardRef<HTMLInputElement, Props>(
  ({ icon, id, isEditing, name, form, enableEditing }, ref) => {
    return (
      <div className="flex flex-1 items-center gap-x-2">
        {!!icon && (
          <EmojiPopover categoryId={id} categoryName={name}>
            {icon}
          </EmojiPopover>
        )}
        {!isEditing ? (
          <p className="cursor-pointer select-none" onClick={enableEditing}>
            {name}
          </p>
        ) : (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    ref={ref}
                    className="h-7 rounded-none bg-white px-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    );
  },
);

_CategoryInfo.displayName = "CategoryInfo";
export const CategoryInfo = memo(_CategoryInfo);
