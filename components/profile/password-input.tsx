"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { PasswordChangeFormSchemaType } from "~/components/profile/change-password-form";

interface Props {
  form: PasswordChangeFormSchemaType;
  disabled: boolean;
}

export function CurrentPasswordInput({ form, disabled }: Props) {
  return (
    <FormField
      control={form.control}
      name="currentPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg text-muted-foreground">
            Current Password
          </FormLabel>
          <FormControl>
            <Input {...field} type="password" disabled={disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function NewPasswordInput({ form, disabled }: Props) {
  return (
    <FormField
      control={form.control}
      name="newPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg text-muted-foreground">
            New Password
          </FormLabel>
          <FormControl>
            <Input {...field} type="password" disabled={disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function ConfirmPasswordInput({ form, disabled }: Props) {
  return (
    <FormField
      control={form.control}
      name="confirmPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg text-muted-foreground">
            Confirm Password
          </FormLabel>
          <FormControl>
            <Input {...field} type="password" disabled={disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
