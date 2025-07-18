import { StatusCard } from "@/components/ui/statusCard/StatusCard";
import styles from "./StatusOverview.module.css";

export const StatusOverview = () => {
  const cards = [
    { title: "Completados", quantity: 1, status: "complete", to: "" },
    { title: "Pendientes", quantity: 2, status: "pending", to: "" },
    { title: "En proceso", quantity: 3, status: "error", to: "" },
  ];

  return (
    <div className={`${styles.listsStatusContainer} flex-column`}>
      {cards.map((card, i) => (
        <StatusCard title={card.title} quantity={card.quantity} status={card.status} to={card.to} key={i} />
      ))}
    </div>
  );
};
