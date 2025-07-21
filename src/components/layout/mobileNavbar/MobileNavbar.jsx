"use client";
import { useState } from "react";
import styles from "./MobileNavbar.module.css";
import { Home } from "@/components/icons/Home";
import { Folder } from "@/components/icons/Folder";
import { Search } from "@/components/icons/Search";
import { Settings } from "@/components/icons/Settings";

export const MobileNavbar = ({ customClass = "" }) => {
  const [active, setActive] = useState(0);

  const handleActive = (iconId) => {
    setActive(iconId);
  };

  return (
    <nav className={`${styles.navbar} ${customClass}`}>
      <div className={`${styles.icon} ${active == 1 ? styles.active : ""}`} onClick={() => handleActive(1)}>
        <Home />
        <small>Inicio</small>
      </div>
      <div className={`${styles.icon} ${active == 2 ? styles.active : ""}`} onClick={() => handleActive(2)}>
        <Search />
        <small>Buscar</small>
      </div>
      <div className={`${styles.icon} ${active == 3 ? styles.active : ""}`} onClick={() => handleActive(3)}>
        <Folder />
        <small>Mis Listas</small>
      </div>
      <div className={`${styles.icon} ${active == 4 ? styles.active : ""}`} onClick={() => handleActive(4)}>
        <Settings />
        <small>Ajustes</small>
      </div>
    </nav>
  );
};
