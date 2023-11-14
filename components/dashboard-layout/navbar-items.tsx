"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";

import { GoHomeFill } from "react-icons/go";
import { ImPieChart } from "react-icons/im";
import { BiSolidCustomize } from "react-icons/bi";
import { BsFillClockFill } from "react-icons/bs";
import { FaBellConcierge, FaCartShopping } from "react-icons/fa6";

import { useMediaQuery } from "~/hooks/use-media-query";

import { cn } from "~/lib/utils";

const routes = [
  {
    id: uuid(),
    Icon: GoHomeFill,
    label: "Home",
    href: "/dashboard",
  },
  {
    id: uuid(),
    Icon: FaBellConcierge,
    label: "Menu",
    href: "/dashboard/menu",
  },
  {
    id: uuid(),
    Icon: FaCartShopping,
    label: "Orders",
    href: "/dashboard/orders",
  },
  {
    id: uuid(),
    Icon: BsFillClockFill,
    label: "History",
    href: "/dashboard/history",
  },
  {
    id: uuid(),
    Icon: ImPieChart,
    label: "Reports",
    href: "/dashboard/reports",
  },
  {
    id: uuid(),
    Icon: BiSolidCustomize,
    label: "Customize",
    href: "/dashboard/customize",
  },
] as const;

type RouteType = (typeof routes)[number];
type RouteHrefType = RouteType["href"];

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NavbarItems({ setIsOpen }: Props) {
  const router = useRouter();
  const pathname = usePathname() as RouteHrefType;
  const { isMobile } = useMediaQuery();
  const [activeSection, setActiveSection] = useState<RouteHrefType | null>(
    null,
  );

  const handleClick = useCallback(
    (href: RouteHrefType) => {
      if (isMobile) setIsOpen(false);

      setActiveSection(href);
      router.push(href);
    },
    [router, setIsOpen, isMobile],
  );

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (pathname.startsWith("/dashboard")) {
      setActiveSection(pathname);
    } else {
      setActiveSection(null);
    }
  }, [pathname]);

  if (!isMounted) return null;

  return (
    <ul className="space-y-8">
      {routes.map((route) => (
        <li
          key={route.id}
          role="button"
          onClick={() => handleClick(route.href)}
          className={cn(
            "relative flex flex-col items-center justify-center gap-y-2 rounded-xl px-2 py-4 text-muted-foreground transition hover:bg-neutral-200/20",
            pathname === route.href && "text-theme hover:bg-transparent",
          )}
        >
          {activeSection === route.href && (
            <motion.div
              layoutId="active-section"
              className="absolute inset-0 rounded-xl bg-theme/10"
            />
          )}
          <route.Icon size={20} />
          <span className="select-none text-sm">{route.label}</span>
        </li>
      ))}
    </ul>
  );
}
