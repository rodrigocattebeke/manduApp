import styles from "./PSkeleton.module.css";

export const PSkeleton = ({ width = "100%", height = "1rem", className = "" }) => {
  return <div className={`${styles.p} ${className} skeletonPulse`} style={{ width, height }} />;
};
