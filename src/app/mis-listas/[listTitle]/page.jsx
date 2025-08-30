"use client";

import { Loader } from "@/components/loader/Loader";
import { ListView } from "@/components/pages/lista/ListView";
import { ListsContext } from "@/contexts/ListsContext";
import { slugToText } from "@/utils/slugToText";
import { notFound, useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function ListPage() {
  const params = useParams();
  const { listsService, itemsService } = useContext(ListsContext);
  const slug = decodeURIComponent(params.listTitle);
  const [titleSlug, listId] = slug.split("--id");
  const [listItems, setListItems] = useState(undefined);
  const [isSuccess, setIsSuccess] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  if (!listId || !titleSlug) return notFound();

  useEffect(() => {
    const getListItems = async () => {
      const itemsRes = await itemsService.getAllListItems(listId);
      if (itemsRes.success) {
        const itemsArray = Object.values(itemsRes.items);
        setListItems(itemsArray);
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
      setIsLoading(false);
    };
    getListItems();
  }, []);

  if (isLoading) return <Loader />;

  return <>{!isSuccess ? <h2>Ocurrio un error al cargar la lista, intente de nuevo más tarde.</h2> : <ListView listTitle={slugToText(titleSlug)} listId={listId} listItems={listItems} />}</>;
}
