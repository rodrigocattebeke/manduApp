import styles from "./FloatingAddButtonSkeleton.module.css";
export const FloatingAddButtonSkeleton = ({ className = "" }) => {
  return <div className={`${styles.button} ${className} skeletonPulse`}></div>;
};
