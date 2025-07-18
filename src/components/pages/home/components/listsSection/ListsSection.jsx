import { ListCarousel } from "../listCarousel/ListCarousel";
import styles from "./ListsSection.module.css";

export const ListsSection = () => {
  const cards = [
    {
      title: "Libros",
      quantity: 2,
      img: "https://picsum.photos/200",
      to: "#",
    },
    {
      title: "Libros",
      quantity: 2,
      img: "https://picsum.photos/200",
      to: "#",
    },
    {
      title: "Libros",
      quantity: 2,
      img: "https://picsum.photos/200",
      to: "#",
    },
    {
      title: "Libros",
      quantity: 2,
      img: "https://picsum.photos/200",
      to: "#",
    },
  ];

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
