import styles from "./ButtonSkeleton.module.css";

export const ButtonSkeleton = ({ fullWidth = false, width = "" }) => {
  return <div className={`${styles.button} ${fullWidth ? styles.fullWidth : ""} skeletonPulse`} style={{ width }}></div>;
};
