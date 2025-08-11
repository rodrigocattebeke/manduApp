"use client";

import { FormList } from "@/components/formList/FormList";
import { Header } from "@/components/ui/header/Header";

export const Add = () => {
  const handleSubmit = (formObject) => {
    console.log(formObject);
  };

  return (
    <>
      <Header title="Nueva lista" className="d-lg-none" />
      <header className="d-none d-lg-flex align-items-center justify-content-between p-3">
        <h1 className="my-0">Nueva lista</h1>
      </header>
      <section className="container-xxl">
        <FormList onSubmit={handleSubmit} showSelectStatus={false} />
      </section>
    </>
  );
};
