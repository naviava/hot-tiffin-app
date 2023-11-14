"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { FaUser } from "react-icons/fa6";
import { RiLockFill } from "react-icons/ri";
import { Variants, motion } from "framer-motion";

import { cn } from "~/lib/utils";

const iconMap = {
  personal_info: FaUser,
  change_password: RiLockFill,
};

interface Props {
  label: string;
  tabName: string;
  animationVariants?: Variants;
}

export default function ProfileOptionItem({
  label,
  tabName,
  animationVariants,
}: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [activeUserOption, setActiveUserOption] = useState("");

  useEffect(
    () => setActiveUserOption(searchParams.get("tab") || ""),
    [searchParams],
  );

  const Icon = iconMap[tabName as keyof typeof iconMap];

  return (
    <motion.li
      key={tabName}
      variants={animationVariants}
      onClick={() => router.push(`/dashboard/profile?tab=${tabName}`)}
      className={cn(
        "relative mx-auto flex w-[70%] cursor-pointer items-center rounded-full px-6 py-2 text-muted-foreground transition-all md:w-[90%] md:px-3 lg:w-[80%] lg:px-6",
        activeUserOption === tabName && "font-bold text-black",
      )}
    >
      <Icon
        className={cn(
          "mr-4 h-5 w-5",
          activeUserOption === tabName && "text-theme",
        )}
      />
      {label}
      {activeUserOption === tabName && (
        <motion.div
          layoutId="activeUserOption"
          className="absolute inset-0 rounded-full bg-theme/10"
        />
      )}
    </motion.li>
  );
}
