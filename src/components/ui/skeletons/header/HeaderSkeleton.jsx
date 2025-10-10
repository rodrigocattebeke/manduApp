"use client";
import { ArrowBack } from "@/components/icons/ArrowBack";
import styles from "./HeaderSkeleton.module.css";

export const HeaderSkeleton = ({ title = "", className = "" }) => {
  return (
    <header className={`${className} container-xxl d-flex py-3`}>
      <div className={styles.arrowBackContainer}>
        <div className={styles.arrowBack}>
          <ArrowBack />
        </div>
      </div>
      <div className={styles.titleContainer}>
        <h1 className="my-0">{title}</h1>
      </div>
    </header>
  );
};
