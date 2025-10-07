"use client";
import { Search } from "@/components/icons/Search";
import styles from "./SearchBar.module.css";
import { useEffect, useRef, useState } from "react";
import { SEARCH_FILTER_OPTIONS, SEARCH_FILTER_ORDER } from "@/constants/statuses";
import { Tune } from "@/components/icons/Tune";
import { Close } from "@/components/icons/Close";

export const SearchBar = ({ defaultInputValue, onSearch, initialFilter, onFilterChange, onInputChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterSelected, setFilterSelected] = useState(initialFilter || undefined);
  const filterModalRef = useRef();

  if (!onSearch || typeof onSearch !== "function") return console.error("Se debe de pasar una funcion onSearch para manejar la búsqueda.");

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSearch(inputValue);
  };

  useEffect(() => {
    if (onInputChange) {
      if (typeof onInputChange !== "function") return console.error("El onInputChange pasado debe de ser una función.");
      onInputChange(inputValue);
    }
  }, [inputValue]);

  useEffect(() => {
    if (!defaultInputValue) return;
    setInputValue(defaultInputValue);
  }, [defaultInputValue]);

  // Handle filter modal
  const selectFilter = (filter) => {
    if (SEARCH_FILTER_OPTIONS[filter]) {
      setFilterSelected(filter);
    }
  };

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filterSelected);
      setShowFilterModal(false);
    }
  }, [filterSelected]);

  useEffect(() => {
    if (showFilterModal) {
      if (filterModalRef.current) {
        filterModalRef.current.classList.add(styles.fadeIn);
        filterModalRef.current.classList.remove(`${styles.fadeOut}`);
      }
    } else {
      if (filterModalRef.current) {
        filterModalRef.current.classList.add(`${styles.fadeOut}`);
        filterModalRef.current.classList.remove(`${styles.fadeIn}`);
      }
    }
  }, [showFilterModal]);

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchIconContainer}>
        <label htmlFor="search" onClick={() => onSearch(inputValue)}>
          <Search width="1.7rem" height="1.7rem" />
        </label>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="search"
          id="search"
          value={inputValue}
          placeholder="Buscar"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        ></input>
      </form>
      <div className={styles.filterIconContainer}>
        <div className={"d-flex"} onClick={() => setShowFilterModal(true)}>
          <Tune width="1.7rem" height="1.7rem" />
        </div>
        <div className={`${styles.filterOptionsModal} ${showFilterModal ? styles.show : ""}`} ref={filterModalRef} onClick={() => setShowFilterModal(false)}>
          <div className={styles.modalBody} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalClose} onClick={() => setShowFilterModal(false)}>
              <Close />
            </div>
            <p className={styles.modalTitle}>Filtros de búsqueda</p>
            <div className={styles.optionsContainer}>
              {SEARCH_FILTER_ORDER.map((fil, i) => {
                const filter = SEARCH_FILTER_OPTIONS[fil];
                return (
                  <p className={`${styles.filterOption} ${filter.value == filterSelected ? styles.active : ""}`} onClick={() => selectFilter(filter.value)} key={i}>
                    {filter.label}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
