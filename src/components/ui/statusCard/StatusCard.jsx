"use client";
import { CARD_STATUS } from "@/constants/statuses";
import styles from "./StatusCard.module.css";
import Link from "next/link";

export const StatusCard = ({ title = "", quantity = 0, status = undefined, to = "" }) => {
  if (!status) return console.error(`Se necesita pasar un estado para la card. Estados válidos: ${Object.values(CARD_STATUS).join(", ")}`);
  if (!Object.values(CARD_STATUS).includes(status)) return console.error(`El valor de status pasado es incorrecto. Estados válidos: ${Object.values(CARD_STATUS).join(", ")}`);

  return (
    <Link href={to} className={`${styles.card} ${styles[status]}`}>
      <div className={styles.cardBody}>
        <h3 className="my-0">{title}</h3>
        <p className="my-0">{quantity}</p>
      </div>
    </Link>
  );
};
