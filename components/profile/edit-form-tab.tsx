"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Variants } from "framer-motion";

import PersonalInfoForm from "~/components/profile/personal-info-form";
import ChangePasswordForm from "~/components/profile/change-password-form";

const formVariants: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

type TabType = "personal_info" | "change_password" | null;

export default function EditFormTab() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") as TabType;

  const [activeTab, setActiveTab] = useState<TabType>(null);

  useEffect(() => setActiveTab(tab), [tab]);

  return (
    <>
      {activeTab === "personal_info" && (
        <PersonalInfoForm animationVariants={formVariants} />
      )}
      {activeTab === "change_password" && (
        <ChangePasswordForm animationVariants={formVariants} />
      )}
    </>
  );
}
