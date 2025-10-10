"use client";
import { ButtonSkeleton } from "@/components/ui/skeletons/buttonSkeleton/ButtonSkeleton";
import { PSkeleton } from "@/components/ui/skeletons/pSkeleton/PSkeleton";
import styles from "./FormListSkeleton.module.css";

export const FormListSkeleton = ({ showStatusInput = true }) => {
  return (
    <>
      <section className={`${styles.formContainer} mt-2`}>
        <div className={`${styles.infoContainer} d-flex flex-column flex-sm-row`}>
          <div className={styles.container}>
            <div className={styles.imgContainer}>
              <PSkeleton width="100%" height="100%" />
              <div className={styles.uploadImgContainer}>
                <ButtonSkeleton fullWidth="true" />
              </div>
            </div>
          </div>

          <div className={`${styles.inputsContainer} d-flex flex-column`}>
            {/* Title */}
            <div className={`${styles.titleContainer} ${styles.inputContainer}`} id="title">
              <PSkeleton width="100%" height="3rem" />
            </div>

            {/* Description */}
            <div className={`${styles.descriptionContainer} ${styles.inputContainer}`} id="description">
              <PSkeleton width="100%" height="10rem" />
            </div>

            {/* Status  */}
            {showStatusInput == true ? (
              <div className={`${styles.statusContainer} ${styles.inputContainer}`} id="status">
                <PSkeleton width="100%" height="3rem" />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* Action buttons */}
        <div className={`${styles.actionButtonsContainer} d-flex flex-sm-row`}>
          <ButtonSkeleton fullWidth="true" />
          <ButtonSkeleton fullWidth="true" />
        </div>
      </section>
    </>
  );
};
