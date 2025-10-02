"use client";

import { Header } from "@/components/ui/header/Header";
import { SearchBar } from "@/components/ui/searchBar/SearchBar";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import styles from "./Search.module.css";
import { Chip } from "@/components/ui/chip/Chip";
import { useContext, useEffect, useRef, useState } from "react";
import { ItemCard } from "@/components/ui/itemCard/ItemCard";
import { UserContext } from "@/contexts/UserContext";
import { searchService } from "@/services/firestore/search/searchService";
import { Loader } from "@/components/loader/Loader";
import { toUrlSlug } from "@/utils/toUrlSlug";
import { EmptyState } from "@/components/ui/emptyState/EmptyState";
import { SearchFiles } from "@/components/icons/SearchFiles";
import { Empty } from "@/components/icons/Empty";

export const Search = () => {
  const { userData } = useContext(UserContext);
  const { addSearch, recent } = useRecentSearches(userData.userUID);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(undefined);
  const [query, setQuery] = useState(undefined);
  const queryTimeoutRef = useRef();

  // Handle on search
  const onSearch = async (query) => {
    setQuery(query);
  };

  const onInputChange = (query) => {
    if (queryTimeoutRef.current) {
      clearTimeout(queryTimeoutRef.current);
    }
    const timeout = setTimeout(async () => {
      setQuery(query);
    }, 1500);

    queryTimeoutRef.current = timeout;
  };

  //search when the query changes
  useEffect(() => {
    const getSearch = async () => {
      if (!query) return;
      setIsLoading(true);
      const res = await searchService(query);

      if (res.success) {
        if (Object.keys(res.results.lists).length == 0 && Object.keys(res.results.items).length == 0) {
          setSearchResults({});
        } else {
          setSearchResults(res.results);
        }
      } else {
        setSearchResults({});
      }

      setIsLoading(false);

      //update recent searches
      addSearch(query);
    };

    getSearch();
  }, [query]);

  return (
    <>
      <Header title="Buscar" className="d-lg-none" />
      <div className="container-xxl pt-lg-3">
        <SearchBar defaultInputValue={query} onSearch={onSearch} onInputChange={onInputChange} />
      </div>
      {!recent || recent.length == 0 ? (
        ""
      ) : (
        <section className={`${styles.recentSearchesContainer} container-xxl`}>
          <h2 className="m-0">Búsquedas recientes</h2>
          <div className={styles.recentSearches}>{recent ? recent.map((q, i) => <Chip text={q} key={i} onClick={() => setQuery(q)} />) : ""}</div>
        </section>
      )}
      {isLoading ? (
        <Loader fullWidth="true" />
      ) : !searchResults ? (
        //Show empty state if searchResults is falsy
        <EmptyState icon={SearchFiles} message={"Busca entre tus listas e items de forma rápida"} className={"mt-2"} />
      ) : Object.keys(searchResults).length == 0 ? ( //Handle searchResults
        <EmptyState icon={Empty} message={"No se encontraron resultados para la búsqueda"} className={"mt-2"} />
      ) : (
        <section className={`${styles.resultsContainer} container-xxl`}>
          <>
            {Object.values(searchResults.lists).map((result, i) => (
              <ItemCard title={result.title} imgURL={result.imgURL} type={"Lista"} to={`/mis-listas/${toUrlSlug(result.title)}--id${result.id}`} key={i} />
            ))}
            {Object.values(searchResults.items).map((result, i) => (
              <ItemCard title={result.title} imgURL={result.imgURL} type={"Item"} to={`/mis-listas/_--id${result.listId}/${toUrlSlug(result.title)}--id${result.id}`} key={i} />
            ))}
          </>
        </section>
      )}
    </>
  );
};
