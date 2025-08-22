"use client";

import { FormList } from "@/components/formList/FormList";
import { Header } from "@/components/ui/header/Header";
import { ListsContext } from "@/contexts/ListsContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export const Add = () => {
  const { listsService } = useContext(ListsContext);
  const router = useRouter();

  const handleSubmit = async (formObject) => {
    const res = await listsService.addList(formObject);
    if (res.success) {
      router.push("/mis-listas");
    }
    //hay que manejar si es que da !success
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
