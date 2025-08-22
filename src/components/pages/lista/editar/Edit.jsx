"use client";

import { FormList } from "@/components/formList/FormList";
import { Header } from "@/components/ui/header/Header";
import { ListsContext } from "@/contexts/ListsContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export const Edit = ({ list: { title, description, imgURL, id } }) => {
  const { listFunctions } = useContext(ListsContext);
  const router = useRouter();

  const handleSubmit = async (formObject) => {
    const listRes = await listFunctions.updateList(id, formObject);
    if (listRes.success) {
      router.push("/mis-listas");
    }
  };

  const initialValues = {
    title,
    description,
    imgURL,
  };

  return (
    <>
      <Header title="Editar lista" className="d-lg-none" />
      <header className="container-xxl d-lg-flex  d-none align-items-center justify-content-between py-3">
        <h1 className="my-0">Editar lista</h1>
      </header>
      <section className="container-xxl">
        <FormList onSubmit={handleSubmit} initialValuesObject={initialValues} />
      </section>
    </>
  );
};
