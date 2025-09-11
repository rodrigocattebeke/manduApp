"use client";
import { Close } from "@/components/icons/Close";
import styles from "./Modal.module.css";
import { Button } from "../button/Button";
import { useEffect, useState } from "react";
import { Loader } from "@/components/loader/Loader";

/**
 * @param {{
 * title?: "string",
 * description?: "string",
 * mode?: "warning" | "success" | "danger" ,
 * show?: boolean,
 * onCancel?: ()=>void,
 * onConfirm: ()=>void,
 * onClose: ()=>void,
 * }} params
 */

export const Modal = ({ title = "Confirmar", description = "", mode = "warning", show = true, onConfirm, onCancel, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (mode !== "warning" && mode !== "success" && mode !== "danger") return console.error("Se debe de pasar un valor válido para la prop mode. Valores válidos: danger, success, warning");
  if (mode !== "success" && (!onConfirm || typeof onConfirm !== "function")) return console.error("Se debe de pasar una funcion onConfirm.");
  if (!onClose) return console.error("Se necesita pasar una funcion onClose para manejar el cierre/apertura del modal.");

  useEffect(() => {
    if (show) {
      setIsMounted(true);
      setIsClose(false);
    } else if (!show) {
      setIsClose(true);
      const timeout = setTimeout(() => {
        setIsMounted(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  //Handle modal close
  const handleClose = () => {
    onClose();
  };

  // Handle onConfirm
  const handleOnConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
  };

  return (
    isMounted && (
      <div className={`${styles.backdrop} ${isClose ? styles.close : styles.show}`}>
        {isLoading ? (
          <Loader fullScreen="true" />
        ) : (
          <div className={styles.modal}>
            <div className={styles.closeContainer}>
              <div className={styles.close} onClick={handleClose}>
                <Close />
              </div>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.text}>
                <p className={styles.modalTitle}>{title}</p>
                <p className={`m-0`}>{description}</p>
              </div>
              <div className={styles.actionButtons}>
                {mode == "success" ? (
                  <Button text="Confirmar" fullWidth="true" mode="success" onClick={onClose} />
                ) : (
                  <>
                    <Button text="Cancelar" fullWidth="true" mode={mode == "danger" ? "danger" : "default"} onClick={onCancel} />
                    <Button text="Confirmar" fullWidth="true" mode={mode == "danger" ? "default" : "primary"} onClick={handleOnConfirm} />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};
