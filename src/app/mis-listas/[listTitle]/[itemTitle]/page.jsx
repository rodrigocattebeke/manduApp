"use client";
import { Loader } from "@/components/loader/Loader";
import { ItemView } from "@/components/pages/item/ItemView";
import { ListsContext } from "@/contexts/ListsContext";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function ItemPage() {
  const { itemsService } = useContext(ListsContext);
  const pathname = usePathname();
  const lastSection = pathname.split("/").pop(); //Get the last url section

  const [titleSlug, itemId] = lastSection.split("--id");

  const [item, setItem] = useState(undefined);
  const [isSuccess, setIsSuccess] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

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
  return <>{!isSuccess ? <h2>Error al obtener los datos, intente mas tarde</h2> : <ItemView item={item} />}</>;
}
