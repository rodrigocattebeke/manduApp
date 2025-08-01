"use client";

import React, { useState } from "react";
import styles from "./ListView.module.css";
import Image from "next/image";
import { Edit } from "@/components/icons/Edit";
import { STATUS, STATUS_LABELS } from "@/constants/statuses";
import { Header } from "@/components/ui/header/Header";

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

export const ListView = ({ listTitle = "", listItems }) => {
  const [filterSelected, setFilterSelected] = useState(FILTER_STATES[0].filter);
  const [filteredItems, setFilteredItems] = useState(listItems || []);

  if (!listItems) return console.error("Se necesitan los items de la lista para mostrarlos.");

  // Function for filter items
  const filterItems = (filter) => {
    if (filter == "all") return setFilteredItems(listItems);

    const newItems = listItems.filter((item) => item.status == filter);
    setFilteredItems(newItems);
  };

  const handleFilter = (filter) => {
    console.log(filter);
    setFilterSelected(filter);
    filterItems(filter);
  };

  return (
    <>
      <Header title={listTitle} />

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
            {/* <thead>
              <tr>
                <th>

                </th>
              </tr>
            </thead> */}
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
                    <div className={styles.editIconContainer}>
                      <Edit />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
