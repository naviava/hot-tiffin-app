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

export default function DobInput({ form, disabled }: Props) {
  return (
    <FormField
      control={form.control}
      name="dob"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg text-muted-foreground">
            Data of Birth
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={disabled}
              value={field.value || ""}
              placeholder="mm/dd/yyyy"
              className="text-lg font-semibold tracking-wide placeholder:text-base"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
