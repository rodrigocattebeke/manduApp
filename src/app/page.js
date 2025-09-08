"use client";

import { Loader } from "@/components/loader/Loader";
import { HomePage } from "@/components/pages/inicio/HomePage";
import { UserContext } from "@/contexts/UserContext";
import { getRecentEdits } from "@/services/firestore/getRecentEdits";
import { getStatusSummary } from "@/services/firestore/getStatusSummary";
import { notFound } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { userFunctions } = useContext(UserContext);
  const [statusSummaryArray, setStatusSummaryArray] = useState([]);
  const [recentUpdatedArray, setRecentUpdatedArray] = useState([]);
  const [favoritesListsArray, setFavoritesListsArray] = useState([]);
  const [recentCreatedArray, setRecentCreatedArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getAllLists = async () => {
      const results = await Promise.allSettled([getStatusSummary(), userFunctions.getRecentCreatedLists(), userFunctions.getFavoritesLists(), userFunctions.getRecentUpdatedLists()]);

      //Filter fullfilled responses
      const fulfilled = results.filter((res) => res.status == "fulfilled");

      if (fulfilled.length == 0) return setIsError(true);

      const [statusSummaryRes, recentCreatedRes, favoritesListsRes, recentUpdatedRes] = results;
      setStatusSummaryArray(statusSummaryRes.value);
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
  }, [userFunctions]);

  if (isLoading) return <Loader />;
  if (isError) return notFound();
  return (
    <>
      <HomePage statusSummary={statusSummaryArray} recentUpdated={recentUpdatedArray} favorites={favoritesListsArray} recentCreated={recentCreatedArray} />
    </>
  );
}
