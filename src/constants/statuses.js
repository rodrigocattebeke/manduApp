export const STATUS = {
  completed: "completed",
  in_process: "in_process",
  pending: "pending",
};

export const STATUS_LABELS = {
  [STATUS.completed]: "Completado",
  [STATUS.in_process]: "En proceso",
  [STATUS.pending]: "Pendiente",
};

export const STATUS_SUMMARY_ROUTES = {
  [STATUS.completed]: "#",
  [STATUS.in_process]: "#",
  [STATUS.pending]: "#",
};
