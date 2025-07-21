import { Add } from "@/components/icons/Add";
import styles from "./FloatingAddButton.module.css";
import Link from "next/link";

export const FloatingAddButton = ({ onClick, to }) => {
  const handleClick = () => {
    if (typeof onClick === "function") onClick();
  };

  if (to) {
    return (
      <Link href={to} onClick={handleClick} className={styles.button} aria-label="Agregar">
        <Add width="1.7rem" height="1.7rem" />
      </Link>
    );
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      className={styles.button}
    >
      <Add width="1.7rem" height="1.7rem" />
    </div>
  );
};
