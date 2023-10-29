"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";
import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";

import { GoHomeFill } from "react-icons/go";
import { ImPieChart } from "react-icons/im";
import { BiSolidCustomize } from "react-icons/bi";
import { BsFillClockFill } from "react-icons/bs";
import { FaBellConcierge, FaCartShopping } from "react-icons/fa6";

import { cn } from "~/lib/utils";

const routes = [
  {
    id: uuid(),
    icon: GoHomeFill,
    label: "Home",
    paramsTag: null,
  },
  {
    id: uuid(),
    icon: FaBellConcierge,
    label: "Menu",
    paramsTag: "menu",
  },
  {
    id: uuid(),
    icon: FaCartShopping,
    label: "Orders",
    paramsTag: "orders",
  },
  {
    id: uuid(),
    icon: BsFillClockFill,
    label: "History",
    paramsTag: "history",
  },
  {
    id: uuid(),
    icon: ImPieChart,
    label: "Reports",
    paramsTag: "reports",
  },
  {
    id: uuid(),
    icon: BiSolidCustomize,
    label: "Customize",
    paramsTag: "customize",
  },
];

export default function SideNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const currentTab = useMemo(() => searchParams.get("tab"), [searchParams]);

  const [activeSection, setActiveSection] = useState<string | null>(currentTab);

  const handleClick = useCallback(
    (paramsTag: string | null) => {
      const url = qs.stringifyUrl(
        {
          url: pathname,
          query: { tab: paramsTag },
        },
        { skipNull: true, skipEmptyString: true },
      );

      setActiveSection(paramsTag);
      router.push(url);
    },
    [pathname, router],
  );

  return (
    <ul className="space-y-8">
      {routes.map((route) => (
        <li
          key={route.id}
          role="button"
          onClick={() => handleClick(route.paramsTag)}
          className={cn(
            "relative flex flex-col items-center justify-center gap-y-2 rounded-xl px-2 py-4 text-muted-foreground transition hover:bg-neutral-200/20",
            currentTab === route.paramsTag && "text-theme hover:bg-transparent",
          )}
        >
          {activeSection === route.paramsTag && (
            <motion.div
              layoutId="active-section"
              className="absolute inset-0 rounded-xl bg-theme/10"
            />
          )}
          <route.icon size={20} />
          <span className="select-none text-sm">{route.label}</span>
        </li>
      ))}
    </ul>
  );
}
