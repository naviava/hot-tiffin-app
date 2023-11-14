import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { PersonalInfoFormSchemaType } from "~/components/profile/personal-info-form";

interface Props {
  form: PersonalInfoFormSchemaType;
  disabled: boolean;
}

export default function NameInput({ form, disabled }: Props) {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg text-muted-foreground">Name</FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={disabled}
              className="text-lg font-semibold tracking-wide"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
