import { useMediaQuery as useMQ } from "usehooks-ts";

export function useMediaQuery() {
  const isMobile = useMQ("(max-width: 767px)");
  const isTab = useMQ("(min-width : 768px) and (max-width : 1023px)");
  const isTabPro = useMQ("(min-width: 1024px) and (max-width : 1279px)");
  const isDesktop = useMQ("(min-width: 1280px)");

  return { isMobile, isTab, isTabPro, isDesktop };
}
