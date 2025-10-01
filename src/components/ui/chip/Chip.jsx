import { Close } from "@/components/icons/Close";
import styles from "./Chip.module.css";

export const Chip = ({ text = "", icon: Icon, showClose = false, onClose, className, ...props }) => {
  if (showClose && (!onClose || typeof onclose !== "function")) return console.error("Para manejar el closeButton, se necesita pasar una function onClose");
  return !Icon ? (
    <div className={`${styles.chip} ${className}`} title={text} {...props}>
      <p>{text}</p>
      <div className={`${styles.close} ${showClose ? styles.show : ""}`}>
        <div onClick={onClose}>
          <Close width="1.2rem" height="1.2rem" />
        </div>
      </div>
    </div>
  ) : (
    <div className={`${styles.chip} ${className}`} title={text} {...props}>
      <Icon />
      <p>{text}</p>
      <div className={`${styles.close} ${showClose ? styles.show : ""}`}>
        <div onClick={onClose}>
          <Close width="1.2rem" height="1.2rem" />
        </div>
      </div>
    </div>
  );
};
