import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { PersonalInfoFormSchemaType } from "~/components/profile/personal-info-form";
import { GenderType } from "@prisma/client";

interface Props {
  form: PersonalInfoFormSchemaType;
  disabled: boolean;
}

export default function GenderRadioButtons({ form, disabled }: Props) {
  return (
    <FormField
      control={form.control}
      name="gender"
      render={({ field }) => (
        <RadioGroup
          defaultValue={field.value}
          onValueChange={field.onChange}
          className="flex items-center space-x-4"
        >
          {Object.values(GenderType).map((item) => (
            <FormItem
              key={item}
              className="flex cursor-pointer place-items-center space-x-2 space-y-0 py-2"
            >
              <FormControl>
                <RadioGroupItem
                  value={item}
                  disabled={disabled}
                  className="h-5 w-5 border-2 border-neutral-300"
                />
              </FormControl>
              <FormLabel className="cursor-pointer text-lg capitalize">
                {item.toLowerCase()}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      )}
    />
  );
}
