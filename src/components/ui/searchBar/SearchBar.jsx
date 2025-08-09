"use client";
import { Search } from "@/components/icons/Search";
import styles from "./SearchBar.module.css";
import { useEffect, useState } from "react";

export const SearchBar = ({ onSearch, onInputChange }) => {
  const [inputValue, setInputValue] = useState("");
  if (!onSearch || typeof onSearch !== "function") return console.error("Se debe de pasar una funcion onSearch para manejar la búsqueda.");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  useEffect(() => {
    if (onInputChange) {
      if (typeof onInputChange !== "function") return console.error("El onInputChange pasado debe de ser una función.");
      onInputChange(inputValue);
    }
  }, [inputValue]);

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
    </div>
  );
};
