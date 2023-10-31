"use client";

import { useState } from "react";

import { X } from "lucide-react";

import { useMediaQuery } from "~/hooks/use-media-query";

import AddMenuItemForm from "~/components/add-menu-item-form";
import CustomizeOptionsPanel from "~/components/dashboard/customize-options-panel";

interface Props {}

export default function CustomizePage({}: Props) {
  const { isMobile } = useMediaQuery();
  const [activeSection, setActiveSection] = useState<string | null>(
    isMobile ? null : "ADD_ITEM",
  );

  return (
    <>
      {isMobile && !!activeSection && <X className="fixed left-5 top-3" />}
      <article className="m-4 gap-x-4 md:flex">
        {(isMobile ? !activeSection : true) && (
          <section className="w-full flex-1 rounded-3xl bg-white py-4 md:max-w-[14rem] lg:max-w-[20rem]">
            <CustomizeOptionsPanel
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </section>
        )}
        {isMobile ? (
          activeSection === "ADD_ITEM" && <AddMenuItemForm />
        ) : (
          <AddMenuItemForm />
        )}
      </article>
    </>
  );
}
