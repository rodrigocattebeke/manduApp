"use client";

import Script from "next/script";

export const ClientLayout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <Script src="/js/bootstrap.bundle.min.js" />
    </>
  );
};
