"use client";

import { ElementRef, memo, useCallback, useRef, useState } from "react";

import * as z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";

import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { Form } from "~/components/ui/form";
import { CategoryActions } from "./category-actions";
import { CategoryInfo } from "./category-info";

import { trpc } from "~/app/_trpc/client";

const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Category name is required" }),
  icon: z.string().min(1),
});

export type CategorySchemaType = UseFormReturn<{
  id: string;
  name: string;
  icon: string;
}>;

interface Props {
  id: string;
  name: string;
  icon: string | null;
}

export const CategoryItem = memo(_CategoryItem);
function _CategoryItem({ id, name, icon }: Props) {
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = useCallback(() => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.select());
  }, []);

  const disableEditing = useCallback(() => setIsEditing(false), []);

  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    },
    [disableEditing],
  );

  useEventListener("keydown", handleEscapeKey);
  useOnClickOutside(formRef, disableEditing);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      id: id,
      name,
      icon: icon ?? "",
    },
  });

  const utils = trpc.useUtils();
  const { mutate: handleUpdateCategory, isLoading } =
    trpc.list.updateCategory.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: (data) => {
        disableEditing();
        utils.list.invalidate();
        toast.success(`Updated category: ${name} --> ${data.name}`);
      },
    });
  const onSubmit = useCallback(
    (values: z.infer<typeof categorySchema>) => {
      handleUpdateCategory(values);
    },
    [handleUpdateCategory],
  );

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center justify-between gap-x-4 rounded-lg bg-white px-4 py-2"
      >
        <CategoryInfo
          ref={inputRef}
          form={form}
          id={id}
          name={name}
          icon={icon}
          isEditing={isEditing}
          disabled={isLoading}
          enableEditing={enableEditing}
        />
        <CategoryActions
          id={id}
          isEditing={isEditing}
          disabled={isLoading}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </form>
    </Form>
  );
}
