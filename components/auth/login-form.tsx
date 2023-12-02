"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { LoginFormInput } from "./login-form-input";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginFormSchemaType = UseFormReturn<{
  email: string;
  password: string;
}>;

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof loginFormSchema>) => {
      setIsLoading(true);

      await signIn("credentials", {
        ...values,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.ok) {
            toast.success(`Logged in`);
            router.refresh();
          } else {
            toast.error("Invalid credentials");
          }
        })
        .finally(() => setIsLoading(false));
    },
    [router],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <LoginFormInput
          form={form}
          name="email"
          label="Email Address"
          disabled={isLoading}
        />
        <LoginFormInput
          form={form}
          name="password"
          label="Password"
          type="password"
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="theme"
          disabled={isLoading}
          className="w-full"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
