"use client";

import { FloatingAddButton } from "@/components/ui/floatingAddButton/FloatingAddButton";
import { Header } from "@/components/ui/header/Header";
import { ButtonSkeleton } from "@/components/ui/skeletons/buttonSkeleton/ButtonSkeleton";
import { ItemCardSkeleton } from "@/components/ui/skeletons/itemCardSkeleton/ItemCardSkeleton";
import styles from "./MyListsSkeleton.module.css";

export const MyListsSkeleton = () => {
  const totalCards = 3;

  return (
    <>
      <Header title="Mis Listas" className="d-lg-none" />
      <header className="d-none d-lg-flex align-items-center justify-content-between p-3">
        <h1 className="my-0">Mis Listas</h1>
        <div>
          <ButtonSkeleton />
        </div>
      </header>
      <div className={styles.cardsContainer}>
        {Array(totalCards)
          .fill(0)
          .map((e, i) => (
            <ItemCardSkeleton key={i} />
          ))}
      </div>

      <FloatingAddButton to={"/mis-listas/agregar"} className="d-lg-none" />
    </>
  );
};
