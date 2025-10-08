"use client";
import { Header } from "@/components/ui/header/Header";
import styles from "./ItemView.module.css";
import Image from "next/image";
import { STATUS_LABELS } from "@/constants/statuses";
import { Edit } from "@/components/icons/Edit";
import { Delete } from "@/components/icons/Delete";
import Link from "next/link";
import { Button } from "@/components/ui/button/Button";
import { formattedFirestoreTimestamp } from "@/utils/formattedFirestoreTimestamp";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { ListsContext } from "@/contexts/ListsContext";
import { Modal } from "@/components/ui/modal/Modal";

export const ItemView = ({ item }) => {
  if (!item) return console.error("Se esperaba un objeto con los datos del item a mostrar.");

  const router = useRouter();
  const pathname = usePathname();
  const { itemsService } = useContext(ListsContext);
  const [showModal, setShowModal] = useState(false);

  //Date format
  const formattedDate = formattedFirestoreTimestamp(item.createdAt);

  // handle confirm modal
  const handleShowModal = async () => {
    setShowModal(true);
  };

  // handle onConfirm modal
  const onConfirm = async () => {
    const url = pathname.split("/");
    url.pop(); // Remove the item route
    const listUrl = url.join("/");

    const res = await itemsService.removeItem(item.id);
    if (res.success) {
      router.push(listUrl);
    } else {
      alert("Ocurrió un error, intente de nuevo más tarde");
    }
    setShowModal(false);
  };

  return (
    <>
      <Header title={item.title} className="d-lg-none" />
      {/* header in md screen size */}
      <header className="container-xxl d-md-flex  d-none align-items-center justify-content-between py-3">
        <h1 className="my-0">{item.title}</h1>
        <div className={"d-flex align-items-center"}>
          <Button text="Eliminar" mode="default" onClick={handleShowModal} />
          <Link href={`${pathname}/editar`} className="ms-3">
            <Button text="Editar ítem" mode="primary" />
          </Link>
        </div>
      </header>

      <section className="container-xxl d-flex flex-column py-3 pt-md-0">
        <div className="d-flex flex-column flex-md-row-reverse order-md-2">
          <div className={styles.imgContainer}>
            <Image src={item.imgURL} width={400} height={220} alt={`Imagen del item ${item.title}`} />
          </div>
          <div className={styles.infoContainer}>
            {item.description ? (
              <>
                <h2 className="m-0">Descripción</h2>
                <div className={styles.itemDescriptionContainer}>
                  <p>{item.description}</p>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Status */}
        <div className={`${styles.statusContainer} d-flex flex-column order-md-1 mb-md-0 mt-3 mt-md-0`}>
          <div className={"d-flex justify-content-between align-items-center"}>
            <p className="m-0">{STATUS_LABELS[item.status] || ""}</p>
            <span className={`${styles.statusDot} ${styles[item.status]} d-md-none`}></span>
          </div>
          <p className={`${styles.itemCreationDate} my-md-2`}>Añadido el {formattedDate}</p>
        </div>
      </section>

      {/* Action buttons */}
      <section className={`${styles.actionButtons} d-md-none`}>
        <div className={styles.deleteButton} onClick={handleShowModal}>
          <Delete />
        </div>
        <div className={styles.editButton}>
          <Link href={`${pathname}/editar`}>
            <Edit />
          </Link>
        </div>
      </section>

      {/* Modals */}

      <Modal title="¿Desea eliminar el ítem?" show={showModal} mode="danger" onConfirm={onConfirm} onClose={() => setShowModal(false)} onCancel={() => setShowModal(false)} />
    </>
  );
};
