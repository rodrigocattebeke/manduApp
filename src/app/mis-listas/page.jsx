"use client";
import { MyLists } from "@/components/pages/mis-listas/MyLists";
import { MyListsSkeleton } from "@/components/skeletons/pages/MisListas/MyListsSkeleton";
import { ListsContext } from "@/contexts/ListsContext";
import { useContext, useEffect, useState } from "react";

export default function MisListas() {
  const { listsService, lists } = useContext(ListsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(undefined);

  useEffect(() => {
    const fetchAllLists = async () => {
      const res = await listsService.getAllLists();
      if (res.success) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
      setIsLoading(false);
    };
    fetchAllLists();
    return () => {
      setIsLoading(true);
      setIsSuccess(undefined);
    };
  }, []);

  if (isLoading) return <MyListsSkeleton />;

  return <>{!isSuccess ? <h2>Error al cargar las listas, intenta mas tarde</h2> : <MyLists lists={lists}></MyLists>}</>;
}
