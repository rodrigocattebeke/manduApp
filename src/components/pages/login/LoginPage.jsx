import Image from "next/image";
import styles from "./LoginPage.module.css";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton/GoogleLoginButton";

export const LoginPage = () => {
  return (
    <div className={styles.back}>
      <section className={styles.container}>
        <div className={styles.logoContainer}>
          <Image src="/images/logo.png" width={120} height={120}></Image>
          <h1>ManduApp</h1>
        </div>
        <div className={styles.greetingContainer}>
          <h2>¡Bienvenido de nuevo!</h2>
          <p>Accedé a tus listas, desde cualquier dispositivo</p>
        </div>
        <div className={styles.authMethodsContainer}>
          <div className={styles.googleAuthContainer}>
            <GoogleLoginButton />
          </div>
        </div>
      </section>
    </div>
  );
};
