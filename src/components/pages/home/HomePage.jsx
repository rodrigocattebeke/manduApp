"use client";
import { useContext } from "react";
import styles from "./HomePage.module.css";
import { UserContext } from "@/contexts/UserContext";
import { StatusOverview } from "./statusOverview/StatusOverview";

export const HomePage = () => {
  const { userData } = useContext(UserContext);

  return (
    <>
      <section className="container-xxl d-flex align-items-center justify-content-center py-3">
        <h1 className="my-0">Inicio</h1>
      </section>
      <section className={` container-xxl`}>
        <div>
          <h2 className="my-0">Hola, {userData.displayName.split(" ")[0]}</h2>
          <p className="my-0">Esto es lo último de tus listas</p>
        </div>
        <StatusOverview></StatusOverview>
      </section>
    </>
  );
};
