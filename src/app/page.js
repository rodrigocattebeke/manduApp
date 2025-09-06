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
  const [recentlyEditedArray, setRecentlyEditedArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getAllLists = async () => {
      const results = await Promise.allSettled([getStatusSummary(), userFunctions.getRecentUpdatedLists(), userFunctions.getFavoritesLists(), getRecentEdits()]);

      //Filter fullfilled responses
      const fulfilled = results.filter((res) => res.status == "fulfilled");

      if (fulfilled.length == 0) return setIsError(true);

      const [statusSummaryRes, recentUpdatedRes, favoritesListsRes, recentlyEditedRes] = results;

      setStatusSummaryArray(statusSummaryRes.value);
      setRecentUpdatedArray(recentUpdatedRes.value);
      if (recentUpdatedRes.value.success) {
        setRecentUpdatedArray(Object.values(recentUpdatedRes.value.updatedLists));
      }
      if (favoritesListsRes.value.success) {
        setFavoritesListsArray(Object.values(favoritesListsRes.value.lists));
      }
      setRecentlyEditedArray(recentlyEditedRes.value);
      setIsLoading(false);
    };

    getAllLists();
  }, [userFunctions]);

  if (isLoading) return <Loader />;
  if (isError) return notFound();
  return (
    <>
      <HomePage favorites={favoritesListsArray} recentEdits={recentlyEditedArray} recentUpdates={recentUpdatedArray} statusSummaryArray={statusSummaryArray} />
    </>
  );
}
