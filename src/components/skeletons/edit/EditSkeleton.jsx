"use client";

import { Header } from "@/components/ui/header/Header";
import { FormListSkeleton } from "../formList/FormListSkeleton";

export const EditSkeleton = ({ showStatusInput = true }) => {
  return (
    <>
      <Header title="Editar lista" className="d-lg-none" />
      <header className="container-xxl d-lg-flex  d-none align-items-center justify-content-between py-3">
        <h1 className="my-0">Editar lista</h1>
      </header>
      <section className="container-xxl">
        <FormListSkeleton showStatusInput={showStatusInput} />
      </section>
    </>
  );
};
