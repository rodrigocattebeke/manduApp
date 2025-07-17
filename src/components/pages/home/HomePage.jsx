"use client";
import { useContext } from "react";
import styles from "./HomePage.module.css";
import { UserContext } from "@/contexts/UserContext";
import { StatusCard } from "@/components/ui/statusCard/StatusCard";

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
        <div className={`${styles.listsStatusContainer} flex-column`}>
          <StatusCard title="Completados" quantity={1} status={"complete"} />
          <StatusCard title="En proceso" quantity={5} status={"pending"} />
          <StatusCard title="Pendientes" quantity={2} status={"error"} />
        </div>
      </section>
    </>
  );
};
