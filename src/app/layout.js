import "../../public/css/bootstrap-grid.min.css";
import "@/app/globals.css";
import { ClientLayout } from "@/layouts/ClientLayout.jsx";
import { Roboto } from "next/font/google";

export const metadata = {
  title: "ManduApp",
  description: "",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

console.log(roboto);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{<ClientLayout>{children}</ClientLayout>}</body>
    </html>
  );
}
