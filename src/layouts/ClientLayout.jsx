"use client";

import { MobileNavbar } from "@/components/layout/mobileNavbar/MobileNavbar";
import { HIDDEN_NAVBAR_ROUTES } from "@/constants/hiddenNavbarRoutes";
import { usePathname } from "next/navigation";
import Script from "next/script";

export const ClientLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      <main>{children}</main>
      {/* Hidde navbar in specific routes */}
      {!HIDDEN_NAVBAR_ROUTES.includes(pathname) && <MobileNavbar customClass="d-sm-none" />}
      <Script src="/js/bootstrap.bundle.min.js" />
    </>
  );
};
