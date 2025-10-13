import { Header } from "@/components/ui/header/Header";
import styles from "./SobreNosotros.module.css";

export const SobreNosotros = () => {
  return (
    <>
      <Header title="Sobre Nosotros" />
      <section className={`${styles.aboutUsContainer} container-xxl`}>
        <h2>Nuestra Misión</h2>
        <p>En ManduApp, creemos en el poder de la organización.</p>
        <p>Nuestra misión es ofrecer una plataforma fluida e intuitiva para crear listas, agregar ítems y llevar un seguimiento de su estado, ya sea completado, en proceso o pendiente.</p>
        <p>Con ManduApp, puedes gestionar fácilmente las cosas que quieres hacer, leer o retomar, todo ordenado en un solo lugar mediante una interfaz limpia y moderna. Estamos dedicados a hacer que la gestión de tareas y listas sea simple, eficiente y agradable.</p>
        <p>
          Para soporte o consultas, puedes contactarnos directamente en{" "}
          <a href="mailto:manduappsupp@gmail.com" className={styles.supportGmail}>
            manduappsupp@gmail.com
          </a>
        </p>
      </section>
    </>
  );
};
