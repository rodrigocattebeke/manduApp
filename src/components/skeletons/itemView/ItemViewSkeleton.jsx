import { ButtonSkeleton } from "@/components/ui/skeletons/buttonSkeleton/ButtonSkeleton";
import { HeaderSkeleton } from "@/components/ui/skeletons/header/HeaderSkeleton";
import { PSkeleton } from "@/components/ui/skeletons/pSkeleton/PSkeleton";
import styles from "./ItemViewSkeleton.module.css";

export const ItemViewSkeleton = () => {
  return (
    <>
      <HeaderSkeleton className="d-lg-none" />
      {/* header in md screen size */}
      <header className="container-xxl d-md-flex  d-none align-items-center justify-content-between py-3">
        <PSkeleton width="12rem" height="2rem" />
        <div className={`${styles.buttonsContainer} d-flex align-items-center`}>
          <ButtonSkeleton />
          <ButtonSkeleton />
        </div>
      </header>

      <section className="container-xxl d-flex flex-column py-3 pt-md-0">
        <div className="d-flex flex-column flex-md-row-reverse order-md-2">
          <div className={styles.imgContainer}>
            <PSkeleton width="100%" height="100%" />
          </div>
          <div className={styles.infoContainer}>
            <PSkeleton width="10rem" height="1.8rem" />
            <div className={styles.itemDescriptionContainer}>
              <PSkeleton width="10rem" height="1rem" />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className={`${styles.statusContainer} d-flex flex-column order-md-1 mb-md-3 mt-3 mt-md-0`}>
          <div className={"d-flex mb-md-2 justify-content-between align-items-center"}>
            <PSkeleton width="6rem" height="1rem" />
          </div>
          <div className={styles.itemCreationDate}>
            <PSkeleton width="12rem" height="1rem" />
          </div>
        </div>
      </section>

      {/* Action buttons */}
      <section className={`${styles.actionButtons} d-md-none`}>
        <div className={styles.button}>
          <PSkeleton />
        </div>
        <div className={styles.button}>
          <PSkeleton />
        </div>
      </section>
    </>
  );
};
