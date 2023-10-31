import { MenuItemSchemaType } from "~/components/add-menu-item-form";

import { Textarea } from "~/components/ui/textarea";
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

export default function DescriptionInput({ form, disabled }: Props) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-medium tracking-wide text-muted-foreground">
            Description
          </FormLabel>
          <FormControl>
            <Textarea
              disabled={disabled}
              rows={4}
              placeholder="Delicious, scrumptuous, finger-licking good..."
              className="resize-none text-lg font-semibold placeholder:text-base placeholder:font-normal"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
