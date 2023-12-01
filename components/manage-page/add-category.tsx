"use client";

import { ElementRef, use, useCallback, useMemo, useRef, useState } from "react";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Check, PlusCircle, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEventListener, useOnClickOutside } from "usehooks-ts";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { trpc } from "~/app/_trpc/client";

const categorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
  icon: z.string().min(1),
});

interface Props {}

export function AddCategory({}: Props) {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isAdding, setIsAdding] = useState(false);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      icon: "🍇",
    },
  });

  const emoji = useMemo(() => form.getValues("icon"), [form]);

  const enableAdding = useCallback(() => {
    setIsAdding(true);
    setTimeout(() => inputRef.current?.focus());
  }, []);

  const disableAdding = useCallback(() => {
    setIsAdding(false);
    form.reset();
  }, [form]);

  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableAdding();
      }
    },
    [disableAdding],
  );

  useEventListener("keydown", handleEscapeKey);
  useOnClickOutside(formRef, disableAdding);

  const utils = trpc.useUtils();
  const { mutate: handleAddCategory, isLoading } =
    trpc.list.addCategory.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: (data) => {
        utils.list.invalidate();
        toast.success(
          `Category "${data.name}" added. Remember to set an emoji for it.`,
        );
      },
    });

  const onSubmit = useCallback(
    (values: z.infer<typeof categorySchema>) => {
      handleAddCategory(values);
    },
    [handleAddCategory],
  );

  return (
    <>
      {!isAdding && (
        <div
          role="button"
          onClick={enableAdding}
          className="flex w-fit cursor-pointer items-center pl-2"
        >
          <PlusCircle className="mr-2 h-4 w-4 text-theme" />
          <span className="text-sm font-medium text-muted-foreground">
            Add category
          </span>
        </div>
      )}
      {isAdding && (
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center justify-between gap-x-4 rounded-lg bg-white px-4 py-2"
          >
            <div className="flex flex-1 items-center gap-x-2">
              <span>{emoji}</span>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        ref={inputRef}
                        disabled={isLoading}
                        placeholder="Category name"
                        className="h-7 rounded-none bg-white px-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={isLoading}
                onClick={disableAdding}
              >
                <X className="h-5 w-5 text-rose-500" />
              </Button>
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                disabled={isLoading}
              >
                <Check className="h-5 w-5 text-green-600" />
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
