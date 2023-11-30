"use client";

import { ElementRef, memo, useCallback, useRef, useState } from "react";

import * as z from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Edit, Trash2, X } from "lucide-react";

import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { CategoryInfo } from "./category-info";
import { trpc } from "~/app/_trpc/client";
import { toast } from "sonner";

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

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      id: id,
      name,
      icon: icon ?? "",
    },
  });

  const utils = trpc.useUtils();
  const { mutate: updateCategory } = trpc.list.updateCategory.useMutation({
    onError: ({ message }) => toast.error(message),
    onSuccess: (data) => {
      utils.list.invalidate();
      disableEditing();
      toast.success(`Updated category: ${name} --> ${data.name}`);
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof categorySchema>) => {
      updateCategory(values);
    },
    [updateCategory],
  );

  return (
    <Form {...form}>
      <form
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
          enableEditing={enableEditing}
        />
        {!isEditing ? (
          <div>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={enableEditing}
              className="group"
            >
              <Edit className="h-5 w-5 text-muted-foreground group-hover:text-theme" />
            </Button>
            <Button type="button" size="sm" variant="ghost" className="group">
              <Trash2 className="h-5 w-5 text-muted-foreground group-hover:text-rose-500" />
            </Button>
          </div>
        ) : (
          <div>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={disableEditing}
            >
              <X className="h-5 w-5 text-rose-500" />
            </Button>
            <Button type="submit" size="sm" variant="ghost">
              <Check className="h-5 w-5 text-green-600" />
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
