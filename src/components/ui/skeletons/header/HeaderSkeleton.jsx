"use client";
import { ArrowBack } from "@/components/icons/ArrowBack";
import styles from "./HeaderSkeleton.module.css";
import { PSkeleton } from "../pSkeleton/PSkeleton";

export const HeaderSkeleton = ({ title = "", className = "" }) => {
  return (
    <header className={`${className} container-xxl d-flex py-3`}>
      <div className={styles.arrowBackContainer}>
        <div className={styles.arrowBack}>
          <ArrowBack />
        </div>
      </div>
      <div className={styles.titleContainer}>{title ? <h1 className="my-0">{title}</h1> : <PSkeleton width="12rem" height="2rem" />}</div>
    </header>
  );
};
