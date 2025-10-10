import styles from "./ChipSkeleton.module.css";

export const ChipSkeleton = () => {
  return <div className={`${styles.chip} skeletonPulse`}></div>;
};
