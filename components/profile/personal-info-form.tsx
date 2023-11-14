"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { motion, Variants } from "framer-motion";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { GenderType } from "@prisma/client";

import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import DobInput from "~/components/profile/dob-input";
import NameInput from "~/components/profile/name-input";
import PhoneNumberInput from "~/components/profile/phone-number-input";
import GenderRadioButtons from "~/components/profile/gender-radio-buttons";

import { trpc } from "~/app/_trpc/client";

const personalInfoFormSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  gender: z.nativeEnum(GenderType),
  phoneNumber: z
    .string()
    .regex(
      /^(?![- ])(?!.*[- ]$)(?!.*[- ]{2,})[0-9 -]*$/,
      "ex. 413-203... or 413 203...",
    ),
  dob: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}|^$/,
      "Enter the required date format",
    ),
});

export type PersonalInfoFormSchemaType = UseFormReturn<{
  name: string;
  gender: GenderType;
  phoneNumber: string;
  dob: string;
}>;

interface Props {
  animationVariants: Variants;
}

export default function PersonalInfoForm({ animationVariants }: Props) {
  const router = useRouter();

  const getUserProfile = trpc.user.getUserProfile.useQuery(undefined, {});
  const user = useMemo(() => getUserProfile.data, [getUserProfile.data]);

  const form = useForm<z.infer<typeof personalInfoFormSchema>>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      name: user?.name,
      gender: user?.gender,
      phoneNumber: user?.phoneNumber || "",
      dob: (user?.dob && format(new Date(user?.dob), "MM/dd/yyyy")) || "",
    },
  });

  const { mutate: editMyProfile, isLoading } =
    trpc.user.editMyProfile.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: () => {
        form.reset();
        router.refresh();
        toast.success("Profile updated successfully");
      },
      onSettled: () => getUserProfile.refetch(),
    });

  const onSubmit = useCallback(
    (values: z.infer<typeof personalInfoFormSchema>) => {
      editMyProfile(values);
    },
    [editMyProfile],
  );

  useEffect(() => {
    if (getUserProfile.isFetched) {
      form.setValue("name", user?.name || "");
      form.setValue("gender", user?.gender || "UNSPECIFIED");
      form.setValue("phoneNumber", user?.phoneNumber || "");
      form.setValue(
        "dob",
        (user?.dob && format(new Date(user?.dob), "MM/dd/yyyy")) || "",
      );
    }
  }, [form, getUserProfile.isFetched, user]);

  return (
    <motion.section
      variants={animationVariants}
      initial="initial"
      animate="animate"
      className="h-full max-w-xl flex-1 rounded-[2rem] bg-white px-4 py-6 md:py-8 lg:px-8"
    >
      <h2 className="text-xl font-bold">Personal Information</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <GenderRadioButtons form={form} disabled={isLoading} />
          <NameInput form={form} disabled={isLoading} />
          <div className="space-y-2">
            <p className="text-lg text-muted-foreground">Email</p>
            <Input
              value={user?.email}
              disabled
              className="text-lg font-semibold tracking-wide"
            />
          </div>
          <PhoneNumberInput form={form} disabled={isLoading} />
          <DobInput form={form} disabled={isLoading} />
          <motion.div layout className="flex items-center gap-x-4 pt-6">
            <Button
              type="button"
              variant="theme-outline"
              disabled={isLoading}
              onClick={() => form.reset()}
              className="flex-1 font-semibold"
            >
              Discard Changes
            </Button>
            <Button
              type="submit"
              variant="theme"
              disabled={isLoading}
              className="flex-1 font-semibold"
            >
              Save Changes
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.section>
  );
}
