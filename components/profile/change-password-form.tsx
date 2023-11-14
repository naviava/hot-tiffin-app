"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { UseFormReturn } from "react-hook-form";
import { Variants, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ConfirmPasswordInput,
  CurrentPasswordInput,
  NewPasswordInput,
} from "~/components/profile/password-input";
import { Form } from "~/components/ui/form";

import { trpc } from "~/app/_trpc/client";
import { Button } from "../ui/button";

const passwordChangeFormSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/,
      "Password must contain at least: 6 characters, 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character",
    ),
  confirmPassword: z.string().min(6, "Must be the same as new password"),
});

export type PasswordChangeFormSchemaType = UseFormReturn<{
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}>;

interface Props {
  animationVariants: Variants;
}

export default function ChangePasswordForm({ animationVariants }: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof passwordChangeFormSchema>>({
    resolver: zodResolver(passwordChangeFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate: handleChangePassword, isLoading } =
    trpc.user.changePassword.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: () => {
        form.reset();
        router.refresh();
        toast.success("Password changed successfully");
      },
    });

  const onSubmit = useCallback(
    (values: z.infer<typeof passwordChangeFormSchema>) => {
      handleChangePassword(values);
    },
    [handleChangePassword],
  );

  return (
    <motion.div
      variants={animationVariants}
      initial="initial"
      animate="animate"
      className="h-full max-w-xl flex-1 rounded-[2rem] bg-white px-4 py-6 md:py-8 lg:px-8"
    >
      <h2 className="text-xl font-bold">Change Your Password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <CurrentPasswordInput form={form} disabled={isLoading} />
          <NewPasswordInput form={form} disabled={isLoading} />
          <ConfirmPasswordInput form={form} disabled={isLoading} />
          <div className="pt-4">
            <Button
              type="submit"
              variant="theme"
              className="w-full font-semibold"
            >
              Change Password
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
