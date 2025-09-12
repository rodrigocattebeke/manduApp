"use client";
import React from "react";
import { UserLists } from "./components/userLists/UserLists";
import { FloatingAddButton } from "@/components/ui/floatingAddButton/FloatingAddButton";
import { Header } from "@/components/ui/header/Header";
import { Button } from "@/components/ui/button/Button";
import Link from "next/link";
import { AddFiles } from "@/components/icons/AddFiles";
import { EmptyState } from "@/components/ui/emptyState/EmptyState";

export const MyLists = ({ lists }) => {
  if (!lists) return console.error("Se debe de pasar las listas del usuario.");
  return (
    <>
      <Header title="Mis listas" className="d-lg-none" />
      <header className="d-none d-lg-flex align-items-center justify-content-between p-3">
        <h1 className="my-0">Mis Listas</h1>
        <Link href={"/mis-listas/agregar"}>
          <Button text="+ Nueva Lista" mode="primary" />
        </Link>
      </header>
      {Object.keys(lists).length === 0 ? <EmptyState icon={AddFiles} message={"Empieza organizando tus ideas"} action={<Link href={"/mis-listas/agregar"}>¡Agrega tu primera lista!</Link>} /> : <UserLists lists={lists} />}
      <FloatingAddButton to={"/mis-listas/agregar"} className="d-lg-none" />
    </>
  );
};
