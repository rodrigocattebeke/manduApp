import Image from "next/image";
import styles from "./ItemCard.module.css";
import Link from "next/link";

export const ItemCard = ({ title = "", quantity = 0, img = "", to = undefined }) => {
  if (!to) console.error(`Se necesita pasar una URL a la prop "to" para la redirección de la item card. Ej: `);
  return (
    <Link className={styles.itemCard} href={to}>
      <div className={styles.imgContaner}>
        <img src={img} alt={title + " photo"} />
      </div>
      <div className={styles.textContainer}>
        <p>{title}</p>
        <p className={styles.quantity}>{quantity} items</p>
      </div>
    </Link>
  );
};
