"use client";

import { motion } from "framer-motion";

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

export default function PhoneNumberInput({ form, disabled }: Props) {
  return (
    <FormField
      control={form.control}
      name="phoneNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg text-muted-foreground">
            Phone Number
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={disabled}
              value={field.value || ""}
              className="text-lg font-semibold tracking-wide"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
