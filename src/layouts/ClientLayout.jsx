"use client";

import { Navbar } from "@/components/layout/navbar/Navbar";
import { HIDDEN_NAVBAR_ROUTES } from "@/constants/hiddenNavbarRoutes";
import { usePathname } from "next/navigation";
import Script from "next/script";

export const ClientLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      {/* layout */}
      <div className="container-xxl p-0 d-flex">
        {/* Hidde navbar in specific routes */}
        {!HIDDEN_NAVBAR_ROUTES.includes(pathname) && <Navbar />}
        <main className="container-xxl p-0">{children}</main>
      </div>
      <Script src="/js/bootstrap.bundle.min.js" />
    </>
  );
};
