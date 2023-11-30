import { MenuItemSchemaType } from "~/components/menu-item-form";

import { Input } from "~/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

interface Props {
  form: MenuItemSchemaType;
  disabled?: boolean;
}

export default function PriceInput({ form, disabled }: Props) {
  return (
    <div className="flex-1">
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium tracking-wide text-muted-foreground">
              Price
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                disabled={disabled}
                placeholder="4.99"
                className="text-lg font-semibold placeholder:text-base placeholder:font-normal"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
