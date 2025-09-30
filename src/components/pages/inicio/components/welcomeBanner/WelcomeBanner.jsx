import styles from "./WelcomeBanner.module.css";
import Image from "next/image";

export const WelcomeBanner = () => {
  return (
    <div className={`${styles.welcomeBannerContainer}`}>
      <div className={styles.bannerContainer}></div>
      <div className={styles.textContainer}>
        <p className={styles.welcomeText}>Mantente productivo</p>
        <p className={styles.welcomeText}>¡Completa tus listas pendientes de hoy!</p>
      </div>
    </div>
  );
};
