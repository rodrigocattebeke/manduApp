"use client";
import Image from "next/image";
import styles from "./GoogleLoginButton.module.css";

export const GoogleLoginButton = ({ onLogin = null }) => {
  const handleLogin = () => {
    if (onLogin) onLogin();
  };
  return (
    <div className={styles.container} onClick={handleLogin}>
      <Image src={"/images/google-logo.png"} alt="Logo de google" width={35} height={35} />
      <p>Continuar con google</p>
    </div>
  );
};
