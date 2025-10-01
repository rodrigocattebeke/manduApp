"use client";
import styles from "./FilterChips.module.css";
import { Check } from "@/components/icons/Check";
import { AccessTime } from "@/components/icons/AccessTime";
import { HourglassEmpty } from "@/components/icons/HourglassEmpty";
import { Chip } from "@/components/ui/chip/Chip";
import { Menu } from "@/components/icons/Menu";
import { useRouter } from "next/navigation";
import { STATUS } from "@/constants/statuses";

export const FilterChips = () => {
  const router = useRouter();
  const allListRoute = "/mis-listas";
  const pendingListsRoute = `/buscar?filter=${STATUS.pending}`;
  const inProcessListsRoute = `/buscar?filter=${STATUS.in_process}`;
  const completedListsRoute = `/buscar?filter=${STATUS.completed}`;

  const handleNavigate = (route) => {
    router.push(route);
  };

  return (
    <div className={`${styles.container}`}>
      <Chip text="Ver todo" icon={Menu} onClick={() => handleNavigate(allListRoute)} />
      <Chip text="Pendientes" icon={HourglassEmpty} onClick={() => handleNavigate(pendingListsRoute)} />
      <Chip text="En proceso" icon={AccessTime} onClick={() => handleNavigate(inProcessListsRoute)} />
      <Chip text="Completados" icon={Check} onClick={() => handleNavigate(completedListsRoute)} />
    </div>
  );
};
