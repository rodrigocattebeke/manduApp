"use client";
import { useEffect, useState } from "react";
import styles from "./MobileNavbar.module.css";
import { Home } from "@/components/icons/Home";
import { Folder } from "@/components/icons/Folder";
import { Search } from "@/components/icons/Search";
import { Settings } from "@/components/icons/Settings";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MobileNavbar = ({ customClass = "" }) => {
  const [active, setActive] = useState(0);
  const pathname = usePathname();

  const buttonsArray = [
    {
      icon: <Home />,
      title: "Inicio",
      href: "/",
      id: 1,
    },
    {
      icon: <Search />,
      title: "Buscar",
      href: "/buscar",
      id: 2,
    },
    {
      icon: <Folder />,
      title: "Mis listas",
      href: "/mis-listas",
      id: 3,
    },
    {
      icon: <Settings />,
      title: "Ajustes",
      href: "/ajustes",
      id: 4,
    },
  ];

  const handleActive = (iconId) => {
    setActive(iconId);
  };

  useEffect(() => {
    const basePath = pathname.split("/")[1];

    const buttonObject = buttonsArray.find((button) => button.href == `/${basePath}`);

    buttonObject ? setActive(buttonObject.id) : setActive(null);
  });

  return (
    <nav className={`${styles.navbar} ${customClass}`}>
      {buttonsArray.map((button, i) => (
        <Link href={button.href} className={`${styles.icon} ${active == button.id ? styles.active : ""}`} onClick={() => handleActive(button.id)} key={i}>
          {button.icon}
          <small>{button.title}</small>
        </Link>
      ))}
    </nav>
  );
};
