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
import { SEARCH_FILTER_OPTIONS } from "@/constants/statuses";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Search = () => {
  //    User
  const { userData } = useContext(UserContext);
  const { addSearch, recent } = useRecentSearches(userData.userUID);

  //    Router
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  //    Search
  const [searchResults, setSearchResults] = useState(undefined);
  const [query, setQuery] = useState("");
  const [filterParam, setFilterParam] = useState(undefined);
  const searchParam = searchParams.get("filter");
  const [filterSelected, setFilterSelected] = useState(searchParam || SEARCH_FILTER_OPTIONS.all.value);

  //    Refs
  const queryTimeoutRef = useRef();

  //    UI states
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchParam) {
      setFilterParam(searchParam);
      router.replace(pathname);
    }
  }, []);

  // search function
  const getSearch = async () => {
    setIsLoading(true);
    const res = await searchService(query, filterSelected);
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
    if (hasInteracted) {
      addSearch(query);
    }
  };

  // First search if filter is passed in search params
  useEffect(() => {
    if (!hasInteracted && filterParam) {
      getSearch();
    }
  }, [hasInteracted, filterSelected, filterParam]);

  //    Handle filters
  const onFilterChange = (filter) => {
    setFilterSelected(filter);
  };

  // Handle on search
  const onSearch = async (query) => {
    setQuery(query);
  };

  const onInputChange = (query) => {
    if (queryTimeoutRef.current) {
      clearTimeout(queryTimeoutRef.current);
    }
    const timeout = setTimeout(async () => {
      if (query.trim()) {
        setHasInteracted(true);
      }

      setQuery(query);
    }, 1500);

    queryTimeoutRef.current = timeout;
  };

  //search when the query changes
  useEffect(() => {
    if (!query || !query.trim()) return;
    getSearch();
  }, [query, filterSelected]);

  return (
    <>
      <Header title="Buscar" className="d-lg-none" />
      <div className="container-xxl pt-lg-3">
        <SearchBar defaultInputValue={query} onSearch={onSearch} initialFilter={filterSelected} onFilterChange={onFilterChange} onInputChange={onInputChange} />
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
              <ItemCard title={result.title} imgURL={result.imgURL} type={"Item"} to={`/mis-listas/_--id${result.listId}/${toUrlSlug(result.title)}--id${result.id}`} status={result.status} key={i} />
            ))}
          </>
        </section>
      )}
    </>
  );
};
