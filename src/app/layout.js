import "../../public/css/bootstrap-grid.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/app/globals.css";
import { UserProvider } from "@/contexts/UserContext";
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
      <body className={roboto.className}>
        {
          <UserProvider>
            <ClientLayout>{children}</ClientLayout>
          </UserProvider>
        }
      </body>
    </html>
  );
}
