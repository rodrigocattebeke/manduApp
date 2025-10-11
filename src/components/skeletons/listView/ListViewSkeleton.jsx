import { ButtonSkeleton } from "@/components/ui/skeletons/buttonSkeleton/ButtonSkeleton";
import { HeaderSkeleton } from "@/components/ui/skeletons/header/HeaderSkeleton";
import { PSkeleton } from "@/components/ui/skeletons/pSkeleton/PSkeleton";
import { ITEM_FILTER_ORDER } from "@/constants/statuses";
import styles from "./ListViewSkeleton.module.css";

export const ListViewSkeleton = () => {
  const totalItems = 3;

  return (
    <>
      <HeaderSkeleton className="d-lg-none" />
      <header className="container-xxl d-lg-flex flex-column  d-none align-items-start py-3 pb-0">
        <div className={styles.title}>
          <PSkeleton width="15rem" height="2.3rem" />
        </div>
        <div className={styles.headerButtons}>
          <ButtonSkeleton />
          <div className={styles.listActionButtons}>
            <ButtonSkeleton />
            <ButtonSkeleton />
            <ButtonSkeleton />
          </div>
        </div>
      </header>

      {/* Body */}

      <section className="container-xxl d-flex flex-column align-items-center justify-content-center py-3">
        {/* Filters */}
        <div className={styles.filtersContainer}>
          <ul>
            {ITEM_FILTER_ORDER.map((filter, i) => (
              <li className={i == 0 ? styles.active : ""} key={i}>
                <PSkeleton width="4rem" height=".6rem" />
              </li>
            ))}
          </ul>
        </div>

        {/* ITEMS TABLE */}
        <div className={styles.tableContainer}>
          <table>
            <tbody>
              {Array(totalItems)
                .fill(0)
                .map((item, i) => (
                  <tr key={i}>
                    <td className={styles.itemImgContainer}>
                      <PSkeleton width="3.5rem" height="3.5rem" />
                    </td>
                    <td className={styles.itemTitleContainer}>
                      <div>
                        <PSkeleton width="8rem" height=".7rem" />
                        <PSkeleton className={`${styles.itemStatus}`} width="6rem" height=".6rem" />
                      </div>
                    </td>
                    <td>
                      <div className={styles.iconsContainer}>
                        <PSkeleton width="1.5rem" height="1.5rem" />
                        <PSkeleton width="1.5rem" height="1.5rem" />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Floating action buttons */}
      <div className={`${styles.floatingButtonsContainer} d-lg-none`}>
        <div className={styles.buttonsWrapper}>
          <div className={`${styles.floatingButton}`}>
            <PSkeleton width="100%" height="100%" />
          </div>
        </div>
      </div>
    </>
  );
};
