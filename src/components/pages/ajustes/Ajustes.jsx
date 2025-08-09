"use client";

import { Header } from "@/components/ui/header/Header";
import Image from "next/image";
import styles from "./Ajustes.module.css";
import { ArrowForward } from "@/components/icons/ArrowForward";
import { LightMode } from "@/components/icons/LightMode";
import { Info } from "@/components/icons/Info";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import { DarkMode } from "@/components/icons/DarkMode";
import { Button } from "@/components/ui/button/Button";

export const Ajustes = () => {
  const { theme, activateDarkTheme, activateLightTheme } = useContext(ThemeContext);

  const handleTheme = () => {
    if (!theme) return;
    theme == "light" ? activateDarkTheme() : activateLightTheme();
  };

  return (
    <>
      <Header title="Ajustes" className="d-lg-none" />
      <header className="d-none d-lg-flex justify-content-start pt-3">
        <h1 className="my-0">Ajustes</h1>
      </header>
      <section className="container-xxl">
        {/* Account */}
        <div className={styles.settingContainer}>
          <div>
            <h2 className={styles.title}>Cuenta</h2>
          </div>
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <Image src={"https://picsum.photos/200"} width={56} height={56} className={styles.profilePhoto} alt="Foto de perfil" />
              <div className={styles.description}>
                <p className={styles.subtitle}>Editar perfil</p>
                <p>Sofia</p>
              </div>
            </div>
            <div className={styles.iconContainer}>
              <ArrowForward />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className={styles.settingContainer}>
          <div>
            <h2 className={styles.title}>Preferencias</h2>
          </div>
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <div className={styles.settingIcon}>{theme == "light" ? <LightMode /> : <DarkMode />}</div>
              <div className={styles.description}>
                <p className={styles.subtitle}>Tema</p>
              </div>
            </div>
            <div className={styles.iconContainer}>
              <div className={styles.themeToggle} onClick={handleTheme}>
                <div className={`${styles.toggleThumb} ${theme == "dark" ? styles.active : ""}`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className={styles.settingContainer}>
          <div>
            <h2 className={styles.title}>Información</h2>
          </div>
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <div className={styles.settingIcon}>
                <Info />
              </div>
              <div className={styles.description}>
                <p className={styles.subtitle}>Sobre nosotros</p>
                <p>Lee más acerca de nuestra app</p>
              </div>
            </div>
            <div className={styles.iconContainer}>
              <ArrowForward />
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.buttonContainer} container-xxl`}>
        <Button text="Cerrar Sesión" fullWidth="true" />
      </section>
    </>
  );
};
