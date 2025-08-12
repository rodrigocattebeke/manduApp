"use client";

import { FormList } from "@/components/formList/FormList";
import { Header } from "@/components/ui/header/Header";

export const Add = () => {
  const handleSubmit = (formObject) => {
    console.log(formObject);
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
