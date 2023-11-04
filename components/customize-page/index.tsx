"use client";

import { useEffect, useState } from "react";

import { X } from "lucide-react";
import { AnimatePresence, Variants, motion } from "framer-motion";

import { useMediaQuery } from "~/hooks/use-media-query";

import AddMenuItemForm from "~/components/add-menu-item-form";
import CustomizeOptionsPanel from "~/components/customize-page/customize-options-panel";

const optionsPanelVariants: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, staggerChildren: 0.1 },
  },
};

const formVariants: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

export default function CustomizePage() {
  const { isMobile } = useMediaQuery();
  const [activeSection, setActiveSection] = useState<string | null>(
    isMobile ? null : "ADD_ITEM",
  );

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <>
      <article className="relative m-4 gap-x-4 md:flex">
        {isMobile && !!activeSection && (
          <button
            onClick={() => setActiveSection(null)}
            className="absolute -top-11 right-0 flex items-center text-muted-foreground md:hidden"
          >
            <X />
            Close
          </button>
        )}
        {(isMobile ? !activeSection : true) && (
          <motion.section
            variants={optionsPanelVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            className="h-fit w-full flex-1 rounded-3xl bg-white py-4 md:max-w-[14rem] lg:max-w-[20rem]"
          >
            <CustomizeOptionsPanel
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </motion.section>
        )}
        <AnimatePresence mode="sync">
          <motion.section
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            className="relative flex-1 overflow-x-hidden"
          >
            {activeSection === "ADD_ITEM" && (
              <AddMenuItemForm animationVariants={formVariants} />
            )}
            {activeSection === "EDIT_ITEM" && (
              <motion.p variants={formVariants}>EDIT_ITEM</motion.p>
            )}
            {activeSection === "DELETE_ITEM" && (
              <motion.p variants={formVariants}>DELETE_ITEM</motion.p>
            )}
            {activeSection === "ADD_CATEGORY" && (
              <motion.p variants={formVariants}>ADD_CATEGORY</motion.p>
            )}
            {activeSection === "EDIT_CATEGORY" && (
              <motion.p variants={formVariants}>EDIT_CATEGORY</motion.p>
            )}
            {activeSection === "DELETE_CATEGORY" && (
              <motion.p variants={formVariants}>DELETE_CATEGORY</motion.p>
            )}
          </motion.section>
        </AnimatePresence>
      </article>
    </>
  );
}
