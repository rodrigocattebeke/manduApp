"use client";
import { ArrowBack } from "@/components/icons/ArrowBack";
import styles from "./Header.module.css";
import { useParentPath } from "@/hooks/useParentPath";
import { useRouter } from "next/navigation";

export const Header = ({ title = "", className = "" }) => {
  const parentPath = useParentPath();
  const router = useRouter();

  const handleArrowClick = () => {
    router.push(parentPath);
  };

  return (
    <header className={`${className} container-xxl d-flex py-3`}>
      <div className={styles.arrowBackContainer}>
        <div className={styles.arrowBack} onClick={handleArrowClick}>
          <ArrowBack />
        </div>
      </div>
      <div className={styles.titleContainer}>
        <h1 className="my-0">{title}</h1>
      </div>
    </header>
  );
};
