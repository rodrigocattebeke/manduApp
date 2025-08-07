"use client";

import { FormList } from "@/components/formList/FormList";
import { Header } from "@/components/ui/header/Header";

export const Edit = ({ item: { title, description, imgURL, status } }) => {
  const handleSubmit = (formObject) => {
    console.log(formObject);
  };

  const initialValues = {
    title,
    description,
    imgURL,
    status,
  };

  return (
    <>
      <Header title="Editar item" />
      <section className="container-xxl">
        <FormList onSubmit={handleSubmit} showSelectStatus={true} initialValuesObject={initialValues} />
      </section>
    </>
  );
};
