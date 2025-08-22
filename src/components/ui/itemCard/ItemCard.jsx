import Image from "next/image";
import styles from "./ItemCard.module.css";
import Link from "next/link";

export const ItemCard = ({ title = "", quantity = 0, imgURL = "", to = undefined }) => {
  return (
    <Link className={styles.itemCard} href={to || "#"}>
      <div className={styles.imgContaner}>
        <Image src={imgURL} alt={"foto de " + title} width={128} height={128} />
      </div>
      <div className={styles.textContainer}>
        <p>{title}</p>
        {/* <p className={styles.quantity}>{quantity} items</p> */}
      </div>
    </Link>
  );
};
