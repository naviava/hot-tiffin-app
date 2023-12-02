import { Dispatch, SetStateAction } from "react";

import { Variants, motion } from "framer-motion";
import { FaBowlFood } from "react-icons/fa6";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdFolderDelete, MdLibraryAdd } from "react-icons/md";
import { RiDeleteBin6Fill, RiEditBoxFill } from "react-icons/ri";

import OptionsPanelIcon from "~/components/options-panel-icon";

import { cn } from "~/lib/utils";

export const routes = [
  { Icon: FaBowlFood, label: "Add Item", sectionId: "ADD_ITEM" },
  { Icon: MdLibraryAdd, label: "Categories", sectionId: "CATEGORIES" },
] as const;

type Route = (typeof routes)[number];
export type SectionIdType = Route["sectionId"];

const listVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

interface Props {
  activeSection: string | null;
  setActiveSection: Dispatch<SetStateAction<SectionIdType | null>>;
}
export default function CustomizeOptionsPanel({
  activeSection,
  setActiveSection,
}: Props) {
  return (
    <>
      <div className="mx-auto h-20 w-20 overflow-hidden">
        <OptionsPanelIcon />
      </div>
      <motion.ul
        variants={listVariants}
        className="mx-14 mt-8 space-y-8 md:mx-6 lg:mx-10"
      >
        {routes.map((item) => (
          <motion.li
            key={item.sectionId}
            variants={listVariants}
            onClick={() => setActiveSection(item.sectionId)}
            className="relative flex cursor-pointer items-center px-8 py-2 text-muted-foreground transition md:px-2 lg:px-8"
          >
            {activeSection === item.sectionId && (
              <motion.div
                layoutId="activeCustomizeSection"
                className="absolute inset-0 rounded-full bg-theme/10"
              />
            )}
            <item.Icon
              size={20}
              className={cn(
                "mr-4",
                activeSection === item.sectionId && "text-theme",
              )}
            />
            <span
              className={cn(
                "text-lg md:text-base lg:text-lg",
                activeSection === item.sectionId && "font-bold text-black",
              )}
            >
              {item.label}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
}
