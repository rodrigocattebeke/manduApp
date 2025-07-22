"use client";
import { STATUS, STATUS_SUMMARY_ROUTES } from "@/constants/statuses";
import styles from "./StatusCard.module.css";
import Link from "next/link";

export const StatusCard = ({ title = "", quantity = 0, status = undefined }) => {
  if (!status) return console.error(`Se necesita pasar un estado para la card. Estados válidos: ${Object.values(STATUS).join(", ")}`);
  if (!Object.values(STATUS).includes(status)) return console.error(`El valor de status pasado es incorrecto. Estados válidos: ${Object.values(STATUS).join(", ")}`);

  //Get the status card route
  const statusRoute = STATUS_SUMMARY_ROUTES[status] || "#";

  return (
    <Link href={statusRoute} className={`${styles.card} ${styles[status]}`}>
      <div className={styles.cardBody}>
        <h3 className="my-0">{title}</h3>
        <p className="my-0">{quantity}</p>
      </div>
    </Link>
  );
};
