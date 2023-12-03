"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMenuItemModal } from "~/hooks/use-menu-item-modal";

import { Form, FormLabel } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
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
  description: z.string(),
  price: z
    .string()
    .refine((value) => /^(0|[1-9]\d*)(\.\d{1,2})?$/.test(value), {
      message:
        "Price must be a positive number with up to two digits after the decimal point",
    }),
  categoryId: z.string().min(1, { message: "Category cannot be empty" }),
  image: z.string().nullish(),
});

interface Props {
  itemId: string;
}

export function EditItem({ itemId }: Props) {
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File>();

  const { onClose: closeModal } = useMenuItemModal();

  const utils = trpc.useUtils();
  const { data: menuItem, isFetching } =
    trpc.menu.getMenuItemById.useQuery(itemId);
  const { data: categories } = trpc.list.getCategories.useQuery();

  const form = useForm<z.infer<typeof menuItemSchema>>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: menuItem?.name ?? "",
      description: menuItem?.description ?? "",
      price: menuItem?.price.toString() ?? "",
      categoryId: menuItem?.categoryId ?? "",
      image: menuItem?.image ?? "",
    },
  });

  const { mutate: updateMenuItem, isLoading } =
    trpc.menu.updateMenuItem.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: async () => {
        toast.success("Menu item added successfully");

        if (!!form.getValues("image")) {
          await edgestore.publicFiles.confirmUpload({
            url: form.getValues("image") as string,
          });
        }

        utils.menu.invalidate();
        setFile(undefined);
        closeModal();
      },
    });

  const onSubmit = useCallback(
    async (values: z.infer<typeof menuItemSchema>) => {
      updateMenuItem({ ...values, id: itemId });
    },
    [updateMenuItem, itemId],
  );

  if (isFetching) return <EditItemSkeleton />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl space-y-8 rounded-3xl bg-white p-6"
      >
        <section className="relative">
          <div className="absolute inset-0">
            <div className="relative mx-auto h-[200px] w-[200px]">
              <Image
                fill
                src={menuItem?.image || "/menu-item-placeholder-image.jpg"}
                alt={menuItem?.name || "Menu Item"}
                className="object-cover"
              />
            </div>
          </div>
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
                options: {
                  temporary: true,
                  replaceTargetUrl: menuItem?.image
                    ? menuItem.image
                    : undefined,
                },
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
      </form>
    </Form>
  );
}

function EditItemSkeleton() {
  return (
    <div className="max-w-xl space-y-8 rounded-3xl bg-white p-6">
      <Skeleton className="mx-auto h-[200px] w-[200px]" />
      <section className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <p className="text-sm font-medium tracking-wide text-muted-foreground">
            Name of the dish
          </p>
          <Skeleton className="h-10 w-full" />
          <p className="text-sm font-medium tracking-wide text-muted-foreground">
            This will be the name on the menu.
          </p>
        </div>
        {/* Description */}
        <div className="space-y-1">
          <p className="text-sm font-medium tracking-wide text-muted-foreground">
            Description
          </p>
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="flex gap-x-4">
          {/* Price */}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              Price
            </p>
            <Skeleton className="h-10 w-full" />
          </div>
          {/* Category */}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              Category
            </p>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </section>
      <div className="flex gap-x-4">
        <Button
          disabled
          variant="theme-outline"
          className="flex w-full items-center gap-x-2 text-lg transition active:scale-95"
        >
          <span className="text-sm">❌</span>Reset form
        </Button>
        <Button
          disabled
          variant="theme"
          className="w-full text-lg transition active:scale-95"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
