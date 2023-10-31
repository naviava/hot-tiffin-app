import { MenuItemSchemaType } from "~/components/add-menu-item-form";

import { Input } from "~/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

interface Props {
  form: MenuItemSchemaType | any;
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
                type="number"
                min={0}
                step={0.1}
                disabled={disabled}
                placeholder="4.99"
                className="text-lg font-semibold placeholder:text-base placeholder:font-normal"
                {...field}
                onChange={(evt) => {
                  field.onChange(evt);
                  form.setValue("price", Number(evt.target.value));
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
