import { PSkeleton } from "@/components/ui/skeletons/pSkeleton/PSkeleton";
import styles from "./ListsSectionSkeleton.module.css";
import { ItemCardSkeleton } from "@/components/ui/skeletons/itemCardSkeleton/ItemCardSkeleton";

export const ListsSectionSkeleton = () => {
  const totalSections = 3;
  const totalCardsForSection = 4;

  return (
    <>
      {Array(totalSections)
        .fill(0)
        .map((v, i) => (
          <section className={styles.section} key={i}>
            <PSkeleton width="10rem" height="1.2rem" />
            <div className={styles.carousel}>
              {Array(totalCardsForSection)
                .fill(0)
                .map((e, i) => (
                  <ItemCardSkeleton key={i} />
                ))}
            </div>
          </section>
        ))}
    </>
  );
};
