import styles from "./EmptyState.module.css";

export const EmptyState = ({ icon: Icon, message, action }) => {
  return (
    <div className={`${styles.emptyState}`}>
      {Icon && <Icon width="10rem" height="10rem" />}
      <p className={`${styles.message}`}>{message}</p>
      {action && <div className={`${styles.action}`}>{action}</div>}
    </div>
  );
};
