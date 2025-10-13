"use client";

import { Header } from "@/components/ui/header/Header";
import Image from "next/image";
import styles from "./Ajustes.module.css";
import { ArrowForward } from "@/components/icons/ArrowForward";
import { LightMode } from "@/components/icons/LightMode";
import { Info } from "@/components/icons/Info";
import { useContext, useState } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import { DarkMode } from "@/components/icons/DarkMode";
import { Button } from "@/components/ui/button/Button";
import { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import { Modal } from "@/components/ui/modal/Modal";

export const Ajustes = () => {
  const { theme, activateDarkTheme, activateLightTheme } = useContext(ThemeContext);
  const { userData, singOut } = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTheme = () => {
    if (!theme) return;
    theme == "light" ? activateDarkTheme() : activateLightTheme();
  };

  const closeModal = () => {
    setIsModalVisible(false);
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
            <div className="d-flex">
              <Image src={userData.photoURL} width={56} height={56} className={styles.profilePhoto} alt="Foto de perfil" />
            </div>
            <Link href={"/ajustes/cuenta"} className={styles.linkContainer}>
              <div className={styles.description}>
                <p className={styles.subtitle}>Editar perfil</p>
                <p>{userData.displayName}</p>
              </div>
              <div className={styles.iconContainer}>
                <ArrowForward />
              </div>
            </Link>
          </div>
        </div>

        {/* Preferences */}
        <div className={styles.settingContainer}>
          <div>
            <h2 className={styles.title}>Preferencias</h2>
          </div>
          <div className={styles.setting}>
            <div className={"d-flex"}>
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
            <div className={styles.settingIcon}>
              <Info />
            </div>
            <Link href={"#"} className={styles.linkContainer}>
              <div className={styles.description}>
                <p className={styles.subtitle}>Sobre nosotros</p>
                <p>Lee más acerca de nuestra app</p>
              </div>
              <div className={styles.iconContainer}>
                <ArrowForward />
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section className={`${styles.buttonContainer} container-xxl flex-lg-grow-0 flex-grow-1`}>
        <Button text="Cerrar Sesión" fullWidth="true" onClick={() => setIsModalVisible(true)} />
      </section>

      {/* Modals */}
      <Modal title="¿Está seguro de cerrar sesión?" show={isModalVisible} onConfirm={singOut} onClose={closeModal} onCancel={closeModal} />
    </>
  );
};
