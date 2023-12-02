"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Menu } from "lucide-react";
import { AnimatePresence, Variants, motion } from "framer-motion";

import { useMediaQuery } from "~/hooks/use-media-query";

import { Logo } from "~/components/logo";
import UserAvatar from "~/components/user-avatar";
import NavbarItems from "~/components/dashboard-layout/navbar-items";

import { cn } from "~/lib/utils";

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
  const pathname = usePathname();

  const { isMobile } = useMediaQuery();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isMobile) setIsOpen(false);
    else setIsOpen(true);
  }, [isMobile]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

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
              <div>
                <Logo size={50} />
              </div>
              <NavbarItems setIsOpen={setIsOpen} />
              <Link href="/dashboard/profile">
                <div
                  className={cn(
                    "flex flex-col items-center justify-center gap-y-1 rounded-xl px-3 py-4 transition-all",
                    pathname === "/dashboard/profile" && "bg-theme/10",
                  )}
                >
                  <UserAvatar />
                  <span
                    className={cn(
                      "select-none text-sm font-semibold tracking-wide text-muted-foreground",
                      pathname === "/dashboard/profile" && "text-theme",
                    )}
                  >
                    Profile
                  </span>
                </div>
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
