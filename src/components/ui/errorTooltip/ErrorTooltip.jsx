import styles from "./ErrorTooltip.module.css";

/**
 *
 * @param {{error: string,
 * show: boolean}} params
 * @returns
 */

export const ErrorTooltip = ({ error, show = false }) => {
  if (!error) return console.warn("No se pasó ningun mensaje de error");

  return (
    <div className={`${styles.tooltipContainer} ${show ? styles.show : ""}`}>
      <div className={styles.tooltip}>
        <div className={styles.error}>
          <p>{error}</p>
        </div>
        <div className={styles.square}></div>
      </div>
    </div>
  );
};
