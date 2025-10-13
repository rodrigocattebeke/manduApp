import { ButtonSkeleton } from "@/components/ui/skeletons/buttonSkeleton/ButtonSkeleton";
import { FloatingAddButtonSkeleton } from "@/components/ui/skeletons/floatingAddButtonSkeleton/FloatingAddButtonSkeleton";
import { PSkeleton } from "@/components/ui/skeletons/pSkeleton/PSkeleton";
import styles from "./HomeSkeleton.module.css";
import { ChipSkeleton } from "@/components/ui/skeletons/chipSkeleton/ChipSkeleton";
import { ListsSectionSkeleton } from "../../listSectionSkeleton/ListSectionSkeleton";

export const HomeSkeleton = () => {
  return (
    <>
      <header className="container-xxl d-lg-none  d-flex align-items-center justify-content-center py-3">
        <PSkeleton width="8rem" height="2rem" />
      </header>
      <>
        {/* Hero */}
        <section className={`container-xxl p-0 py-lg-3`}>
          <div className="d-flex justify-content-between px-2">
            <div>
              <PSkeleton width="8rem" height="2rem" className="mb-2" />
              <PSkeleton width="14rem" height="1rem" />
            </div>
            <div className="d-none d-lg-flex align-items-center">
              <ButtonSkeleton />
            </div>
          </div>
          <div className={`${styles.welcomeBanner} skeletonPulse`}></div>

          <div className={styles.filterSkeletonsContainer}>
            <ChipSkeleton />
            <ChipSkeleton />
            <ChipSkeleton />
            <ChipSkeleton />
          </div>
        </section>

        {/* Lists section */}
        <section className="container-xxl my-4 " aria-label="Resumen de listas del usuario">
          <ListsSectionSkeleton />
        </section>
      </>

      <FloatingAddButtonSkeleton className="d-lg-none" />
    </>
  );
};
