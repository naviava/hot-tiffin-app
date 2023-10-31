import { MenuItemSchemaType } from "~/components/add-menu-item-form";

import { Input } from "~/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

interface Props {
  form: MenuItemSchemaType | any;
  disabled?: boolean;
}

export default function NameInput({ form, disabled }: Props) {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-medium tracking-wide text-muted-foreground">
            Name of the dish
          </FormLabel>
          <FormControl>
            <Input
              disabled={disabled}
              placeholder="ex: Chicken Tikka"
              className="text-lg font-semibold placeholder:text-base placeholder:font-normal"
              {...field}
            />
          </FormControl>
          <FormDescription>This will the name on the menu.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
