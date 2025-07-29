import styles from "./Button.module.css";

/**
 * @param {{
 *  text?: 'string',
 *  mode?: 'primary' | 'secondary' | 'danger',
 *  fullWidth?: 'false' | 'true',
 *  onClick?: 'function()',
 * }} props
 */

export const Button = ({ text = "", mode = "primary", fullWidth = false, onClick }) => {
  return onClick ? (
    <button className={`${styles.button} ${styles[mode]} ${fullWidth ? styles.fullWidth : ""}`} onClick={onClick}>
      {text}
    </button>
  ) : (
    <button className={`${styles.button} ${styles[mode]} ${fullWidth ? styles.fullWidth : ""}`}>{text}</button>
  );
};
