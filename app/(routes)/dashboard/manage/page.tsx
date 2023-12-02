"use client";

import { useState } from "react";

import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";
import { IoFastFood } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";

import SearchInput from "~/components/search-input";
import { CategoryFilter } from "~/components/category-filter";
import { ManageMenu } from "~/components/manage-page/manage-menu";
import { ManageCategories } from "~/components/manage-page/manage-categories";

const OPTIONS = [
  {
    id: uuid(),
    Icon: IoFastFood,
    label: "MENU",
  },
  {
    id: uuid(),
    Icon: BiSolidCategoryAlt,
    label: "CATEGORIES",
  },
] as const;

export default function ManagePage() {
  const [activeOption, setActiveOption] =
    useState<(typeof OPTIONS)[number]["label"]>("MENU");

  return (
    <div className="m-4 gap-x-4 pb-24 md:mx-4 md:my-0">
      <div className="mb-6 mt-6 grid w-full grid-cols-2">
        {OPTIONS.map((option) => (
          <div
            key={option.id}
            role="button"
            onClick={() => setActiveOption(option.label)}
            className="relative flex items-center justify-center pb-2"
          >
            <option.Icon className="mr-2 h-5 w-5 text-theme" />
            <h2 className="text-sm font-semibold text-neutral-600  md:text-lg">
              {option.label}
            </h2>
            {activeOption === option.label && (
              <motion.div
                layoutId="manageOption"
                className="absolute inset-x-0 bottom-0 h-[2px] bg-theme"
              />
            )}
          </div>
        ))}
      </div>
      {activeOption === "MENU" && (
        <div className="space-y-6">
          <div>
            <SearchInput placeholder="Search menu..." />
          </div>
          <CategoryFilter />
          <ManageMenu />
        </div>
      )}
      {activeOption === "CATEGORIES" && (
        <ManageCategories className="mx-auto" />
      )}
    </div>
  );
}
