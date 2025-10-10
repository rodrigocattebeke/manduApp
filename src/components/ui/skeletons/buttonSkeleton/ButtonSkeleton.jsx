import styles from "./ButtonSkeleton.module.css";

export const ButtonSkeleton = ({ fullWidth = false }) => {
  return <div className={`${styles.button} ${fullWidth ? styles.fullWidth : ""} skeletonPulse`}></div>;
};
