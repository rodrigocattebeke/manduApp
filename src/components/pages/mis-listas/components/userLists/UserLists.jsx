import { ItemCard } from "@/components/ui/itemCard/ItemCard";
import styles from "./UserLists.module.css";
import { toUrlSlug } from "@/utils/toUrlSlug";

export const UserLists = ({ lists = undefined }) => {
  if (!lists || Array.isArray(lists)) return console.error("Debe de pasar un objeto de listas. Cada prop debe de contener: {title, img, to}");

  return (
    <section className={styles.listsContainer} aria-label="Listas del usuario">
      {Object.values(lists).map((list, i) => (
        <ItemCard title={list.title} quantity={list.quantity} imgURL={list.imgURL} to={`/mis-listas/${toUrlSlug(list.title)}--id${list.id}`} key={i} />
      ))}
    </section>
  );
};
