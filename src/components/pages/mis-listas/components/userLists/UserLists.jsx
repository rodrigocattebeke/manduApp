import { ItemCard } from "@/components/ui/itemCard/ItemCard";
import styles from "./UserLists.module.css";

export const UserLists = ({ lists = undefined }) => {
  if (!lists || !Array.isArray(lists)) return console.error("Debe de pasar un array de listas. Cada item debe de contener: {title, quantity, img, to}");

  return (
    <section className={styles.listsContainer} aria-label="Listas del usuario">
      {lists.map((list, i) => (
        <ItemCard title={list.title} quantity={list.quantity} imgURL={list.imgURL} to={list.to} key={i} />
      ))}
    </section>
  );
};
