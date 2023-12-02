"use client";

import { memo, useState } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { LoginFormSchemaType } from "./login-form";

import { cn } from "~/lib/utils";

interface Props {
  form: LoginFormSchemaType;
  name: "email" | "password";
  label: string;
  type?: "text" | "password";
  disabled?: boolean;
}

export const LoginFormInput = memo(_LoginFormInput);
function _LoginFormInput({
  form,
  name,
  label,
  type = "text",
  disabled,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <>
          <FormItem className="relative">
            <FormLabel
              className={cn(
                "absolute left-6 top-[50%] -translate-y-[50%] select-none text-base text-muted-foreground transition-all duration-300",
                (isFocused || !!field.value) &&
                  "-top-2.5 translate-y-0 bg-white px-2 text-sm text-theme",
                !isFocused &&
                  !!field.value &&
                  "text-muted-foreground transition-none duration-0",
              )}
            >
              {label}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type={type}
                autoComplete="off"
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full border border-neutral-300 bg-white"
              />
            </FormControl>
          </FormItem>
          <FormMessage className="ml-6 mt-1" />
        </>
      )}
    />
  );
}
