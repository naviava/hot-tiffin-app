"use client";

import { useEffect, useState } from "react";

import { Menu } from "lucide-react";
import { AnimatePresence, Variants, motion } from "framer-motion";

import { useMediaQuery } from "~/hooks/use-media-query";

import NavbarItems from "~/components/dashboard-layout/navbar-items";

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const navbarVariants: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { type: "tween" },
  },
};

export default function Navbar() {
  const { isMobile } = useMediaQuery();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isMobile) setIsOpen(false);
    else setIsOpen(true);
  }, [isMobile]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-3 top-5 md:hidden"
        >
          <Menu />
        </button>
      )}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-10 bg-black bg-opacity-20 md:hidden"
            />
            <motion.nav
              key="navbar"
              variants={navbarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute inset-y-0 left-0 z-20 flex w-[7rem] flex-col items-center justify-between bg-white px-4 pb-14 pt-8"
            >
              <h2>LOGO</h2>
              <NavbarItems setIsOpen={setIsOpen} />
              <p className="text-center">Avatar</p>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
