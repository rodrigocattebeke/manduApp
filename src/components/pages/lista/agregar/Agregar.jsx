"use client";

import { FormList } from "@/components/formList/FormList";
import { Header } from "@/components/ui/header/Header";

export const Agregar = () => {
  const handleSubmit = (formObject) => {
    console.log(formObject);
  };

  return (
    <>
      <Header title="Nuevo item" />
      <section className="container-xxl">
        <FormList onSubmit={handleSubmit} showSelectStatus={true} />
      </section>
    </>
  );
};
