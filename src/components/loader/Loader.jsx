import styles from "./Loader.module.css";
export const Loader = ({ fullScreen = false, fullWidth = false, backdrop = false }) => {
  return (
    <div className={`${styles.loaderContainer} ${fullScreen ? styles.fullScreen : ""} ${fullWidth ? styles.fullWidth : ""} ${backdrop ? styles.backdrop : ""}`}>
      <span className={`${styles.loader}`}></span>
    </div>
  );
};
