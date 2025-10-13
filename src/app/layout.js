import "../../public/css/bootstrap-grid.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/app/globals.css";
import { UserProvider } from "@/contexts/UserContext";
import { ClientLayout } from "@/layouts/ClientLayout.jsx";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ListsProvider } from "@/contexts/ListsContext";

export const metadata = {
  title: "ManduApp",
  description: "Una aplicación simple y eficiente para crear y gestionar listas e ítems, ayudándote a mantener tus tareas organizadas día a día.",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        {
          <ThemeProvider>
            <UserProvider>
              <ListsProvider>
                <ClientLayout>{children}</ClientLayout>
              </ListsProvider>
            </UserProvider>
          </ThemeProvider>
        }
      </body>
    </html>
  );
}
