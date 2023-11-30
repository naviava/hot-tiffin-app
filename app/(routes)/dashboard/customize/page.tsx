"use client";

import { useEffect, useState } from "react";

import { X } from "lucide-react";
import { AnimatePresence, Variants, motion } from "framer-motion";

import { useMediaQuery } from "~/hooks/use-media-query";

import CustomizeOptionsPanel, {
  SectionIdType,
} from "~/components/customize-page/customize-options-panel";
import { MenuItemForm } from "~/components/menu-item-form";

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
  const [activeSection, setActiveSection] = useState<SectionIdType | null>(
    isMobile ? null : "ADD_ITEM",
  );

  useEffect(() => {
    if (!isMobile && !activeSection) {
      setActiveSection("ADD_ITEM");
    }
  }, [activeSection, isMobile]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <>
      <div className="relative m-4 gap-x-4 md:mx-4 md:my-12 md:flex">
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
            className="mx-auto h-fit flex-1 rounded-3xl bg-white py-4 md:max-w-[14rem] lg:max-w-[20rem]"
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
              <MenuItemForm animationVariants={formVariants} />
            )}
            {activeSection === "ADD_CATEGORY" && (
              <motion.p variants={formVariants}>ADD_CATEGORY</motion.p>
            )}
          </motion.section>
        </AnimatePresence>
      </div>
    </>
  );
}
