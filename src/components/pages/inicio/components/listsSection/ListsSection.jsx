import { ListCarousel } from "../listCarousel/ListCarousel";
import styles from "./ListsSection.module.css";

export const ListsSection = ({ favorites = [], recentCreated = [], recentUpdated = [] }) => {
  if (!Array.isArray(favorites) || !Array.isArray(recentCreated) || !Array.isArray(recentUpdated)) return console.error("Se debe de pasar un array con las listas.");

  return (
    <>
      {/* Recent created */}
      {recentCreated.length > 0 ? (
        <section className={styles.section}>
          <h2 className="my-0">Creadas recientemente</h2>
          <ListCarousel cards={recentCreated} basePath="mis-listas" />
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

      {/* Recent updated */}
      {recentUpdated.length > 0 ? (
        <section className={styles.section}>
          <h2 className="my-0">Editadas recientemente</h2>
          <ListCarousel cards={recentUpdated} basePath="mis-listas" />
        </section>
      ) : (
        ""
      )}
    </>
  );
};
