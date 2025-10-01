"use client";
import { useContext } from "react";
import styles from "./HomePage.module.css";
import { UserContext } from "@/contexts/UserContext";
import { WelcomeBanner } from "./components/welcomeBanner/WelcomeBanner";
import { ListsSection } from "./components/listsSection/ListsSection";
import { FloatingAddButton } from "@/components/ui/floatingAddButton/FloatingAddButton";
import { Button } from "@/components/ui/button/Button";
import Link from "next/link";
import { EmptyState } from "@/components/ui/emptyState/EmptyState";
import { AddFiles } from "@/components/icons/AddFiles";
import { FilterChips } from "./components/filterChips/FilterChips";

export const HomePage = ({ recentCreated = [], favorites = [], recentUpdated = [] }) => {
  const { userData } = useContext(UserContext);
  return (
    <>
      <header className="container-xxl d-lg-none  d-flex align-items-center justify-content-center py-3">
        <h1 className="my-0">Inicio</h1>
      </header>
      {recentCreated.length == 0 && recentUpdated.length == 0 ? (
        <EmptyState icon={AddFiles} message={"Empieza organizando tus ideas"} action={<Link href={"/mis-listas/agregar"}>¡Agrega tu primera lista!</Link>} />
      ) : (
        <>
          {/* Hero */}
          <section className={`container-xxl p-0 py-lg-3`}>
            <div className="d-flex justify-content-between px-2">
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
            <WelcomeBanner />
            <FilterChips />
          </section>

          {/* Lists section */}
          <section className="container-xxl my-4 " aria-label="Resumen de listas del usuario">
            <ListsSection favorites={favorites} recentCreated={recentCreated} recentUpdated={recentUpdated} />
          </section>
        </>
      )}
      <FloatingAddButton to={"/mis-listas/agregar"} className="d-lg-none" />
    </>
  );
};
