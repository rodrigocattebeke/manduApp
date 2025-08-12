"use client";

import { FormList } from "@/components/formList/FormList";
import { Header } from "@/components/ui/header/Header";

export const Edit = ({ list: { title, description, imgURL } }) => {
  const handleSubmit = (formObject) => {
    console.log(formObject);
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
