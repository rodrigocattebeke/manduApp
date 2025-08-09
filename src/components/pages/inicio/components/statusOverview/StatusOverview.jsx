import { StatusCard } from "@/components/ui/statusCard/StatusCard";
import styles from "./StatusOverview.module.css";

export const StatusOverview = ({ statusSummary }) => {
  if (!statusSummary || !Array.isArray(statusSummary)) return console.error("Se debe de pasar el array con los estados.");

  return (
    <div className={`${styles.listsStatusContainer} flex-column flex-md-row`}>
      {statusSummary.map((card, i) => (
        <StatusCard title={card.title} quantity={card.quantity} status={card.status} key={i} />
      ))}
    </div>
  );
};
