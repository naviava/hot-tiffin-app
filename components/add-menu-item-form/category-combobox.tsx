import { Combobox } from "~/components/combobox";

import { MenuItemSchemaType } from "~/components/add-menu-item-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

interface CategoryComboboxProps {
  form: MenuItemSchemaType | any;
  options: { label: string; value: string }[] | undefined;
  disabled?: boolean;
}

export default function CategoryCombobox({
  form,
  options,
  disabled = false,
}: CategoryComboboxProps) {
  return (
    <div className="flex-1">
      <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="mb-1.5 mt-1 text-muted-foreground">
              Category
            </FormLabel>
            <FormControl>
              <Combobox options={options} {...field} disabled={disabled} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
