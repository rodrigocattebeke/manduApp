import styles from "./Button.module.css";

/**
 * @param {{
 *  text?: 'string',
 *  mode?:  'default' | 'primary' | 'secondary' | 'danger',
 *  fullWidth?: 'false' | 'true',
 *  onClick?: 'function()',
 * }} props
 */

export const Button = ({ text = "", mode = "default", fullWidth = false, onClick }) => {
  return onClick ? (
    <button className={`${styles.button} ${styles[mode]} ${fullWidth ? styles.fullWidth : ""}`} onClick={onClick}>
      {text}
    </button>
  ) : (
    <button className={`${styles.button} ${styles[mode]} ${fullWidth ? styles.fullWidth : ""}`}>{text}</button>
  );
};
