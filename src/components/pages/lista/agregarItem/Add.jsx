"use client";

import { FormList } from "@/components/formList/FormList";
import { Header } from "@/components/ui/header/Header";
import { ListsContext } from "@/contexts/ListsContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export const Add = ({ listTitle, listId }) => {
  if (!listId || !listTitle) return console.error("Se necesita pasar el titulo y el id de la lista.");

  const { itemsService } = useContext(ListsContext);
  const router = useRouter();

  const handleSubmit = async (formObject) => {
    const res = await itemsService.addItem(listId, formObject);
    if (res.success) {
      router.push(`/mis-listas/${encodeURIComponent(listTitle)}--id${listId}`);
    }
  };

  return (
    <>
      <Header title="Nuevo ítem" className="d-lg-none" />
      <header className="container-xxl d-lg-flex  d-none align-items-center justify-content-between py-3">
        <h1 className="my-0">Nuevo ítem</h1>
      </header>
      <section className="container-xxl">
        <FormList onSubmit={handleSubmit} showSelectStatus={true} />
      </section>
    </>
  );
};
