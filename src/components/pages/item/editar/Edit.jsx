"use client";

import { FormList } from "@/components/formList/FormList";
import { Header } from "@/components/ui/header/Header";
import { ListsContext } from "@/contexts/ListsContext";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

export const Edit = ({ item: { title, description, id, imgURL, status } }) => {
  const { itemsService } = useContext(ListsContext);
  const router = useRouter();

  const pathnameArray = usePathname().split("/");
  pathnameArray.pop();
  const itemUrl = pathnameArray.join("/");

  const handleSubmit = async (formObject) => {
    const itemRes = await itemsService.updateItem(id, formObject);
    if (itemRes.success) {
      router.push(itemUrl);
    }
  };

  const initialValues = {
    title,
    description,
    imgURL,
    status,
  };

  return (
    <>
      <Header title="Editar item" className="d-lg-none" />
      <header className="container-xxl d-lg-flex  d-none align-items-center justify-content-between py-3">
        <h1 className="my-0">Editar item</h1>
      </header>
      <section className="container-xxl">
        <FormList onSubmit={handleSubmit} showSelectStatus={true} initialValuesObject={initialValues} />
      </section>
    </>
  );
};
