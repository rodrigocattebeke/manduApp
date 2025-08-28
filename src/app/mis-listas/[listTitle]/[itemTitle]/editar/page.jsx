"use client";
import { Loader } from "@/components/loader/Loader";
import { Edit } from "@/components/pages/item/editar/Edit";
import { ListsContext } from "@/contexts/ListsContext";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Editar() {
  const { itemsService } = useContext(ListsContext);
  const pathname = usePathname();
  const sections = pathname.split("/"); //Get the last url section
  const itemSection = sections[sections.length - 2];
  const [item, setItem] = useState(undefined);
  const [isSuccess, setIsSuccess] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const [titleSlug, itemId] = itemSection.split("--id");

  useEffect(() => {
    const getItem = async () => {
      const itemRes = await itemsService.getItem(itemId);
      if (itemRes.success) {
        setItem(itemRes.item);
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
      setIsLoading(false);
    };
    getItem();

    return () => {
      setIsLoading(true);
      setIsSuccess(undefined);
      setItem(undefined);
    };
  }, []);

  if (isLoading) return <Loader />;
  return <>{!isSuccess ? <h2>Error al obtener los datos, intente mas tarde</h2> : <Edit item={item} />}</>;
}
