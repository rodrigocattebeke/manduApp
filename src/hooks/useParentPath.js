import { usePathname } from "next/navigation";

export const useParentPath = () => {
  const currentPath = usePathname();
  const parts = currentPath.split("/");
  parts.pop();
  return parts.join("/") || "/";
};
