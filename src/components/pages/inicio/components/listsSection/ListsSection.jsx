import { ListCarousel } from "../listCarousel/ListCarousel";
import styles from "./ListsSection.module.css";

export const ListsSection = ({ favorites, recentEdits, recentUpdates }) => {
  if (!favorites || !recentEdits || !recentUpdates) console.error("Se necesitan los datos de las listas a mostrar.");

  return (
    <>
      <section className={styles.section}>
        <h2 className="my-0">Listas recientes</h2>
        <ListCarousel cards={recentUpdates} basePath="mis-listas" />
      </section>
      <section className={styles.section}>
        <h2 className="my-0">Favoritos</h2>
        <ListCarousel cards={favorites} basePath="mis-listas" />
      </section>
      <section className={styles.section}>
        <h2 className="my-0">Últimos editados</h2>
        <ListCarousel cards={recentEdits} basePath="mis-listas" />
      </section>
    </>
  );
};
