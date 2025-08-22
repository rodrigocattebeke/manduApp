"use client";

import { Loader } from "@/components/loader/Loader";
import { Edit } from "@/components/pages/lista/editar/Edit";
import { ListsContext } from "@/contexts/ListsContext";
import { getUserLists } from "@/services/firestore/getUserLists";
import { notFound, useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function EditList() {
  const params = useParams();
  const [titleSlug, listId] = params.listTitle.split("--id");
  const { listFunctions } = useContext(ListsContext);
  const [list, setList] = useState(undefined);
  const [isSuccess, setIsSuccess] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getList = async () => {
      const listRes = await listFunctions.getList(listId);
      if (listRes.success) {
        setList(listRes.list);
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }

      setIsLoading(false);
    };
    getList();

    return () => {
      setIsLoading(true);
      setIsSuccess(undefined);
      setList(undefined);
    };
  }, []);

  if (isLoading) return <Loader />;
  return <>{!isSuccess ? <h2>Error al obtener los datos, intente mas tarde</h2> : <Edit list={list} />}</>;
}
