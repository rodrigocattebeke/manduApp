"use client";
import { Header } from "@/components/ui/header/Header";
import styles from "./ItemView.module.css";
import Image from "next/image";
import { STATUS_LABELS } from "@/constants/statuses";
import { Edit } from "@/components/icons/Edit";
import { Delete } from "@/components/icons/Delete";

export const ItemView = ({ item }) => {
  if (!item) return console.error("Se esperaba un objeto con los datos del item a mostrar.");

  //Date format
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = new Date(item.createdAt).toLocaleDateString("es-ES", options);

  return (
    <>
      <Header title={item.title} />
      <section className="container-xxl py-3">
        <div className={styles.imgContainer}>
          <Image src={item.imgURL} width={400} height={220} alt={`Imagen del item ${item.title}`} />
        </div>
        <div className={styles.infoContainer}>
          <h2 className={styles.itemTitle}>{item.title}</h2>
          <div className={styles.itemDescriptionContainer}>
            <p>{item.description}</p>
          </div>
          <div className={"d-flex justify-content-between align-items-center"}>
            <p>{STATUS_LABELS[item.status] || ""}</p>
            <span className={`${styles.statusDot} ${styles[item.status]}`}></span>
          </div>
          <p className={styles.itemCreationDate}>Añadido el {formattedDate}</p>
        </div>
      </section>

      {/* Action buttons */}
      <section className={styles.actionButtons}>
        <div className={styles.deleteButton}>
          <Delete />
        </div>
        <div className={styles.editButton}>
          <Edit />
        </div>
      </section>
    </>
  );
};
