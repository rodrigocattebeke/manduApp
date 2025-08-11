"use client";
import { useContext } from "react";
import styles from "./HomePage.module.css";
import { UserContext } from "@/contexts/UserContext";
import { StatusOverview } from "./components/statusOverview/StatusOverview";
import { ListsSection } from "./components/listsSection/ListsSection";
import { FloatingAddButton } from "@/components/ui/floatingAddButton/FloatingAddButton";
import { Button } from "@/components/ui/button/Button";
import Link from "next/link";

export const HomePage = ({ statusSummary, recentUpdates, favorites, recentEdits }) => {
  const { userData } = useContext(UserContext);

  return (
    <>
      <header className="container-xxl d-lg-none  d-flex align-items-center justify-content-center py-3">
        <h1 className="my-0">Inicio</h1>
      </header>
      <section className={`container-xxl py-lg-3`}>
        <div className="d-flex justify-content-between">
          <div>
            <h2 className="my-0">Hola, {userData.displayName.split(" ")[0]}</h2>
            <p className="my-0">Esto es lo último de tus listas</p>
          </div>
          <div className="d-none d-lg-flex align-items-center">
            <Link href="/mis-listas/agregar">
              <Button text="+ Nueva Lista" mode="primary" />
            </Link>
          </div>
        </div>
        <StatusOverview statusSummary={statusSummary} />
      </section>
      <section className="container-xxl my-4 " aria-label="Resumen de listas del usuario">
        <ListsSection favorites={favorites} recentEdits={recentEdits} recentUpdates={recentUpdates} />
      </section>
      <FloatingAddButton to={"#"} className="d-lg-none" />
    </>
  );
};
