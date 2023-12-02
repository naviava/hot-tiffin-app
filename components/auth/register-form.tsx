"use client";

import { Dispatch, SetStateAction, useCallback } from "react";

import * as z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { RegisterFormInput } from "./register-form-input";

import { trpc } from "~/app/_trpc/client";

const registerFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Maximum 50 characters allowed" })
    .regex(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/, { message: "Invalid name" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
  confirmPassword: z.string(),
});

export type RegisterFormSchemaType = UseFormReturn<{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}>;

interface Props {
  setCurrentModule: Dispatch<SetStateAction<"LOGIN" | "REGISTER">>;
}

export function RegisterForm({ setCurrentModule }: Props) {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: handleRegisterUser, isLoading } =
    trpc.user.registerUser.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: () => {
        toast.success("Registered successfully. You can login now.");
        setCurrentModule("LOGIN");
        form.reset();
      },
    });

  const onSubmit = useCallback(
    (values: z.infer<typeof registerFormSchema>) => {
      handleRegisterUser(values);
    },
    [handleRegisterUser],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <RegisterFormInput
          form={form}
          name="name"
          label="Your name"
          disabled={isLoading}
        />
        <RegisterFormInput
          form={form}
          name="email"
          label="Email Address"
          disabled={isLoading}
        />
        <RegisterFormInput
          form={form}
          name="password"
          label="Password"
          type="password"
          disabled={isLoading}
        />
        <RegisterFormInput
          form={form}
          name="confirmPassword"
          label="Confirm password"
          type="password"
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="theme"
          disabled={isLoading}
          className="w-full"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
