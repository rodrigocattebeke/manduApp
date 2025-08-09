"use client";

import { Header } from "@/components/ui/header/Header";
import { SearchBar } from "@/components/ui/searchBar/SearchBar";
import { useRecentSearches } from "@/lib/hooks/useRecentSearches";
import styles from "./Search.module.css";
import { Chip } from "@/components/ui/chip/Chip";
import { useEffect, useRef, useState } from "react";
import { ItemCard } from "@/components/ui/itemCard/ItemCard";
import { getListItems } from "@/services/firestore/getListItems";

export const Search = () => {
  const [searchResults, setSearchResults] = useState(undefined);
  const { addSearch, recent } = useRecentSearches(1234);
  const queryTimeoutRef = useRef();

  // Handle on search
  const onSearch = (query) => {
    console.log(query);

    //update recent searches
    //addSearch(query)
  };

  const onInputChange = (query) => {
    if (queryTimeoutRef.current) {
      clearTimeout(queryTimeoutRef.current);
    }
    const timeout = setTimeout(() => {
      console.log(query);
    }, 600);

    queryTimeoutRef.current = timeout;
  };

  //Search
  useEffect(() => {
    const getResults = async () => {
      let results = await getListItems();
      setSearchResults(results);
    };
    getResults();
  }, []);

  return (
    <>
      <Header title="Buscar" className="d-lg-none" />
      <div className="container-xxl pt-lg-3">
        <SearchBar onSearch={onSearch} onInputChange={onInputChange} />
      </div>
      <section className={`${styles.recentSearchesContainer} container-xxl`}>
        <h2 className="m-0">Búsquedas recientes</h2>
        <div className={styles.recentSearches}>
          <Chip text={"Batman"} />
          <Chip text={"Trucos gta san andreas"} />
          <Chip text={"autos que comprar"} />
        </div>
      </section>
      <section className={`${styles.resultsContainer} container-xxl`}>{searchResults ? searchResults.length > 0 ? searchResults.map((result, i) => <ItemCard title={result.title} imgURL={result.imgURL} key={i} />) : <p>No hay resultados de busqueda</p> : ""}</section>
    </>
  );
};
