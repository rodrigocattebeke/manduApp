import { cards } from "@/devDatas/cards";
import { ListCarousel } from "../listCarousel/ListCarousel";
import styles from "./ListsSection.module.css";

export const ListsSection = () => {
  return (
    <>
      <section className={styles.section}>
        <h2 className="my-0">Listas recientes</h2>
        <ListCarousel cards={cards} />
      </section>
      <section className={styles.section}>
        <h2 className="my-0">Favoritos</h2>
        <ListCarousel cards={cards} />
      </section>
      <section className={styles.section}>
        <h2 className="my-0">Últimos editados</h2>
        <ListCarousel cards={cards} />
      </section>
    </>
  );
};
