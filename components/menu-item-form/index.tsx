"use client";

import { useCallback, useEffect, useState } from "react";

import * as z from "zod";
import { toast } from "sonner";
import { Variants, motion } from "framer-motion";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useIsMounted } from "~/hooks/use-is-mounted";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import NameInput from "~/components/menu-item-form/name-input";
import PriceInput from "~/components/menu-item-form/price-input";
import { SingleImageDropzone } from "~/components/single-image-dropzone";
import DescriptionInput from "~/components/menu-item-form/description-input";
import CategoryCombobox from "~/components/menu-item-form/category-combobox";

import { trpc } from "~/app/_trpc/client";
import { useEdgeStore } from "~/lib/edgestore";

const menuItemSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name cannot be empty" })
    .max(50, { message: "Name cannot be longer than 50 characters" }),
  description: z.z.string(),
  price: z
    .string()
    .refine((value) => /^(0|[1-9]\d*)(\.\d{1,2})?$/.test(value), {
      message:
        "Price must be a positive number with up to two digits after the decimal point",
    }),
  categoryId: z.string().min(1, { message: "Category cannot be empty" }),
  image: z.string().nullish(),
});

export type MenuItemSchemaType = UseFormReturn<{
  name: string;
  description: string;
  price: string;
  categoryId: string;
  image?: string | undefined | null;
}>;

interface Props {
  animationVariants?: Variants;
}

export function MenuItemForm({ animationVariants }: Props) {
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File>();

  const { data: categories } = trpc.list.getCategories.useQuery();

  const form = useForm<z.infer<typeof menuItemSchema>>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      categoryId: "",
      image: "",
    },
  });

  const { mutate: addMenuItem, isLoading } = trpc.menu.addMenuItem.useMutation({
    onError: ({ message }) => toast.error(message),
    onSuccess: async () => {
      toast.success("Menu item added successfully");

      if (!!form.getValues("image")) {
        await edgestore.publicFiles.confirmUpload({
          url: form.getValues("image") as string,
        });
      }

      form.reset();
      setFile(undefined);
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof menuItemSchema>) => {
      addMenuItem(values);
    },
    [addMenuItem],
  );

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <Form {...form}>
      <motion.form
        variants={animationVariants}
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl space-y-8 rounded-3xl bg-white p-6"
      >
        <section>
          <SingleImageDropzone
            className="mx-auto"
            width={200}
            height={200}
            value={file}
            onChange={async (file) => {
              setFile(file);
              if (!file) return;
              const res = await edgestore.publicFiles.upload({
                file,
                options: { temporary: true },
              });
              form.setValue("image", res.url);
            }}
          />
        </section>
        <section className="space-y-4">
          <NameInput form={form} disabled={isLoading} />
          <DescriptionInput form={form} disabled={isLoading} />
          <div className="flex gap-x-4">
            <PriceInput form={form} disabled={isLoading} />
            <CategoryCombobox
              form={form}
              disabled={isLoading}
              options={categories?.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
        </section>
        <div className="flex gap-x-4">
          <Button
            type="button"
            disabled={isLoading}
            variant="theme-outline"
            onClick={() => {
              form.reset();
              setFile(undefined);
            }}
            className="flex w-full items-center gap-x-2 text-lg transition active:scale-95"
          >
            <span className="text-sm">❌</span>Reset form
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            variant="theme"
            className="w-full text-lg transition active:scale-95"
          >
            Submit
          </Button>
        </div>
      </motion.form>
    </Form>
  );
}
