import { ListCarousel } from "../listCarousel/ListCarousel";
import styles from "./ListsSection.module.css";

export const ListsSection = ({ favorites = [], recentEdits = [], recentUpdates = [] }) => {
  if (!Array.isArray(favorites) || !Array.isArray(recentEdits) || !Array.isArray(recentUpdates)) return console.error("Se debe de pasar un array con las listas.");

  return (
    <>
      {/* Recent updated */}
      {recentUpdates.length > 0 ? (
        <section className={styles.section}>
          <h2 className="my-0">Listas recientes</h2>
          <ListCarousel cards={recentUpdates} basePath="mis-listas" />
        </section>
      ) : (
        ""
      )}

      {/* Favorites lists*/}
      {favorites.length > 0 ? (
        <section className={styles.section}>
          <h2 className="my-0">Favoritos</h2>
          <ListCarousel cards={favorites} basePath="mis-listas" />
        </section>
      ) : (
        ""
      )}

      {/* Recently edited */}
      {recentEdits.length > 0 ? (
        <section className={styles.section}>
          <h2 className="my-0">Últimos editados</h2>
          <ListCarousel cards={recentEdits} basePath="mis-listas" />
        </section>
      ) : (
        ""
      )}
    </>
  );
};
