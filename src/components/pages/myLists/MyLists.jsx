"use client";
import React from "react";
import { UserLists } from "./userLists/UserLists";
import { FloatingAddButton } from "@/components/ui/floatingAddButton/FloatingAddButton";

export const MyLists = () => {
  const cards = [
    {
      title: "Libros",
      quantity: 2,
      img: "https://picsum.photos/200",
      to: "#",
    },
    {
      title: "Libros",
      quantity: 2,
      img: "https://picsum.photos/200",
      to: "#",
    },
    {
      title: "Libros",
      quantity: 2,
      img: "https://picsum.photos/200",
      to: "#",
    },
    {
      title: "Libros",
      quantity: 2,
      img: "https://picsum.photos/200",
      to: "#",
    },
    {
      title: "Libros",
      quantity: 2,
      img: "https://picsum.photos/200",
      to: "#",
    },
    {
      title: "Libros",
      quantity: 2,
      img: "https://picsum.photos/200",
      to: "#",
    },
    {
      title: "Libros",
      quantity: 2,
      img: "https://picsum.photos/200",
      to: "#",
    },
    {
      title: "Libros",
      quantity: 2,
      img: "https://picsum.photos/200",
      to: "#",
    },
  ];

  return (
    <>
      <section className="container-xxl d-flex align-items-center justify-content-center py-3">
        <h1 className="my-0">Mis Listas</h1>
      </section>
      <UserLists lists={cards} />
      <FloatingAddButton />
    </>
  );
};
