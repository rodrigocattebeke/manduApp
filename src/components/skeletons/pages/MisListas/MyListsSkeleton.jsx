"use client";

import { FloatingAddButton } from "@/components/ui/floatingAddButton/FloatingAddButton";
import { ButtonSkeleton } from "@/components/ui/skeletons/buttonSkeleton/ButtonSkeleton";
import { HeaderSkeleton } from "@/components/ui/skeletons/header/HeaderSkeleton";
import { ItemCardSkeleton } from "@/components/ui/skeletons/itemCardSkeleton/ItemCardSkeleton";

export const MyListsSkeleton = () => {
  const totalCards = 3;
  const styles = {
    cardsContainer: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginTop: "1rem",
    },
  };

  return (
    <>
      <HeaderSkeleton title="Mis Listas" className="d-lg-none" />
      <header className="d-none d-lg-flex align-items-center justify-content-between p-3">
        <h1 className="my-0">Mis Listas</h1>
        <div>
          <ButtonSkeleton />
        </div>
      </header>
      <div style={styles.cardsContainer}>
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
