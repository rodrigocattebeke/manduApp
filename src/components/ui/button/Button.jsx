import styles from "./Button.module.css";

/**
 * @param {{
 *  text?: 'string',
 *  mode?:  'default' | 'primary' | 'secondary' | 'success' | 'danger',
 *  fullWidth?: 'false' | 'true',
 *  onClick?: 'function()',
 * }} props
 */

export const Button = ({ text = "", mode = "default", fullWidth = false, onClick, disabled = false }) => {
  return onClick ? (
    <button className={`${styles.button} ${styles[mode]} ${fullWidth ? styles.fullWidth : ""}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  ) : (
    <button className={`${styles.button} ${styles[mode]} ${fullWidth ? styles.fullWidth : ""}`} disabled={disabled}>
      {text}
    </button>
  );
};
