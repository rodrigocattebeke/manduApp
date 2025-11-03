"use client";

import { Navbar } from "@/components/layout/navbar/Navbar";
import { HIDDEN_NAVBAR_ROUTES } from "@/constants/hiddenNavbarRoutes";
import { UserContext } from "@/contexts/UserContext";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useContext } from "react";

export const ClientLayout = ({ children }) => {
  const pathname = usePathname();
  const { userData } = useContext(UserContext);

  return (
    <>
      {/* layout */}
      <div className="container-xxl p-0 d-flex">
        {/* Hidde navbar in specific routes */}
        {!HIDDEN_NAVBAR_ROUTES.includes(pathname) && userData && <Navbar />}
        <main className="container-xxl px-0">{children}</main>
      </div>
      <Script src="/js/bootstrap.bundle.min.js" />
    </>
  );
};
