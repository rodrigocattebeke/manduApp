"use client";

import React, { use, useContext, useEffect, useState } from "react";
import styles from "./ListView.module.css";
import Image from "next/image";
import { Edit } from "@/components/icons/Edit";
import { STATUS, STATUS_LABELS } from "@/constants/statuses";
import { Header } from "@/components/ui/header/Header";
import Link from "next/link";
import { Button } from "@/components/ui/button/Button";
import { usePathname, useRouter } from "next/navigation";
import { toUrlSlug } from "@/utils/toUrlSlug";
import { Visibility } from "@/components/icons/Visibility";
import { Delete } from "@/components/icons/Delete";
import { ListsContext } from "@/contexts/ListsContext";
import { Modal } from "@/components/ui/modal/Modal";
import { Add } from "@/components/icons/Add";
import { UserContext } from "@/contexts/UserContext";
import { Favorite } from "@/components/icons/Favorite";

const FILTER_STATES = [
  {
    title: "Todos",
    filter: "all",
  },
  {
    title: "Completados",
    filter: STATUS.completed,
  },
  {
    title: "En proceso",
    filter: STATUS.in_process,
  },
  {
    title: "Pendientes",
    filter: STATUS.pending,
  },
];

export const ListView = ({ listTitle = "", listId, listItems }) => {
  const { userData, userFunctions } = useContext(UserContext);
  const [filterSelected, setFilterSelected] = useState(FILTER_STATES[0].filter);
  const [filteredItems, setFilteredItems] = useState(listItems || []);
  const { listsService } = useContext(ListsContext);
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isUpdatingFavorite, setIsUpdattingFavorite] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  if (!listId) return console.error("Se debe de pasar el id de la lista.");
  if (!listItems) return console.error("Se necesitan los items de la lista para mostrarlos.");

  // Function for filter items
  const filterItems = (filter) => {
    if (filter == "all") return setFilteredItems(listItems);

    const newItems = listItems.filter((item) => item.status == filter);
    setFilteredItems(newItems);
  };

  //Handle filter
  const handleFilter = (filter) => {
    setFilterSelected(filter);
    filterItems(filter);
  };

  // Detect if the list is favorite
  useEffect(() => {
    if (!userData.favoritesListsIds) return;
    userData.favoritesListsIds.includes(listId) ? setIsFavorite(true) : setIsFavorite(false);
  }, [userData.favoritesListsIds]);

  // Handle favorites
  const handleFavorite = async () => {
    if (isUpdatingFavorite) return; //Evite multi click
    setIsUpdattingFavorite(true);
    if (!isFavorite) {
      const res = await userFunctions.addFavoriteListId(listId);
    } else {
      const res = await userFunctions.removeFavoriteListId(listId);
    }
    setIsUpdattingFavorite(false);
  };

  // handle confirm modal
  const handleShowModal = async () => {
    setShowModal(true);
  };

  // Handle delete list
  const onConfirm = async () => {
    const url = pathname.split("/");
    url.pop(); // Remove the item route
    const listUrl = url.join("/");

    const res = await listsService.removeList(listId);
    if (res.success) {
      router.push(`/mis-listas`);
    } else {
      alert("Ocurrió un error, intente de nuevo más tarde");
    }
    setShowModal(false);
  };

  return (
    <>
      <Header title={listTitle} className="d-lg-none" />
      <header className="container-xxl d-lg-flex flex-column  d-none align-items-start py-3 pb-0">
        <div className={styles.title}>
          <h1>{listTitle}</h1>
        </div>
        <div className={styles.headerButtons}>
          <Link href={`${pathname}/agregar`}>
            <Button text="+ Nuevo ítem" mode="primary" />
          </Link>
          <div className={styles.listActionButtons}>
            <Button text={isFavorite ? "Remover de favoritos" : "Agregar a favoritos"} mode="default" onClick={handleFavorite} disabled={isUpdatingFavorite} />
            <Link href={`${pathname}/editar`}>
              <Button text="Editar lista" mode="default" />
            </Link>
            <Button text="Eliminar lista" mode="default" onClick={handleShowModal} />
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="container-xxl d-flex flex-column align-items-center justify-content-center py-3">
        <div className={styles.filtersContainer}>
          <ul>
            {FILTER_STATES.map((filter, i) => (
              <li className={filterSelected == filter.filter ? styles.active : ""} onClick={() => handleFilter(filter.filter)} key={i}>
                {filter.title}
              </li>
            ))}
          </ul>
        </div>

        {/* ITEMS TABLE */}

        <div className={styles.tableContainer}>
          <table>
            <tbody>
              {filteredItems.map((item, i) => (
                <tr key={i}>
                  <td className={styles.itemImgContainer}>
                    <Image src={item.imgURL} width={56} height={56} alt={`Foto del item ${item.title}`} />
                  </td>
                  <td className={styles.itemTitleContainer}>
                    <div>
                      <p className="m-0">{item.title}</p>
                      <p className={`${styles.itemStatus} ${styles[STATUS[item.status]] || ""}`}>{STATUS_LABELS[item.status] || ""}</p>
                    </div>
                  </td>
                  <td>
                    <div className={styles.iconsContainer}>
                      <Link href={`${pathname}/${toUrlSlug(item.title)}--id${item.id}`}>
                        <Visibility />
                      </Link>
                      <Link href={`${pathname}/${toUrlSlug(item.title)}--id${item.id}/editar`}>
                        <Edit />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Floating action buttons */}
      <div className={`${styles.floatingButtonsContainer} d-lg-none`}>
        <div className={`${styles.floatingButton} `} onClick={handleShowModal} title="Eliminar lista">
          <Delete />
        </div>
        <div className={`${styles.floatingButton} ${styles.favoriteIcon} ${isFavorite ? styles.isFavorite : ""}`} onClick={handleFavorite} title={isFavorite ? "Remover de favoritos" : "Agregar a favoritos"}>
          <Favorite width="2rem" height="2rem" />
        </div>
        <div className={`${styles.floatingButton}`} title="Editar lista">
          <Link href={`${pathname}/editar`}>
            <Edit />
          </Link>
        </div>
        <div className={`${styles.floatingButton} ${styles.addFloatingButton}`} title="Agregar items a la lista">
          <Link href={`${pathname}/agregar`}>
            <Add width="1.7rem" height="1.7rem" />
          </Link>
        </div>
      </div>

      {/* Modals */}

      <Modal title="¿Desea eliminar la lista?" show={showModal} mode="danger" onConfirm={onConfirm} onClose={() => setShowModal(false)} onCancel={() => setShowModal(false)} />
    </>
  );
};
