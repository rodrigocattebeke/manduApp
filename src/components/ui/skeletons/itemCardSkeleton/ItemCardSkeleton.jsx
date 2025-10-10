import { PSkeleton } from "../pSkeleton/PSkeleton";
import styles from "./ItemCardSkeleton.module.css";

export const ItemCardSkeleton = () => {
  return (
    <div className={styles.itemCard}>
      <div className={`${styles.imgContaner} skeletonPulse`}></div>
      <div className={`${styles.textContainer}`}>
        <PSkeleton width="4rem" height="1rem" />
      </div>
    </div>
  );
};
