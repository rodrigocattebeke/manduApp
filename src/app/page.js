"use client";

import { Loader } from "@/components/loader/Loader";
import { HomePage } from "@/components/pages/inicio/HomePage";
import { ListsContext } from "@/contexts/ListsContext";
import { notFound } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { favoritesService, listsService } = useContext(ListsContext);
  const [statusSummaryArray, setStatusSummaryArray] = useState([]);
  const [recentUpdatedArray, setRecentUpdatedArray] = useState([]);
  const [favoritesListsArray, setFavoritesListsArray] = useState([]);
  const [recentCreatedArray, setRecentCreatedArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getAllLists = async () => {
      const results = await Promise.allSettled([listsService.getRecentCreatedLists(), favoritesService.getFavoritesLists(), listsService.getRecentUpdatedLists()]);

      //Filter fullfilled responses
      const fulfilled = results.filter((res) => res.status == "fulfilled");

      if (fulfilled.length == 0) return setIsError(true);

      const [recentCreatedRes, favoritesListsRes, recentUpdatedRes] = results;
      if (recentCreatedRes.value.success) {
        setRecentCreatedArray(Object.values(recentCreatedRes.value.recentLists));
      }
      if (favoritesListsRes.value.success) {
        setFavoritesListsArray(Object.values(favoritesListsRes.value.lists));
      }
      if (recentUpdatedRes.value.success) {
        setRecentUpdatedArray(Object.values(recentUpdatedRes.value.updatedLists));
      }
      setIsLoading(false);
    };

    getAllLists();
  }, [favoritesService, listsService]);

  if (isLoading) return <Loader fullScreen="true" backdrop="true" />;
  if (isError) return notFound();
  return (
    <>
      <HomePage recentUpdated={recentUpdatedArray} favorites={favoritesListsArray} recentCreated={recentCreatedArray} />
    </>
  );
}
