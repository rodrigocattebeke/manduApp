export const STATUS = {
  all: "all",
  lists: "lists",
  completed: "completed",
  in_process: "in_process",
  pending: "pending",
};

export const STATUS_LABELS = {
  [STATUS.completed]: "Completado",
  [STATUS.in_process]: "En proceso",
  [STATUS.pending]: "Pendiente",
};

export const STATUS_ORDER = [STATUS.completed, STATUS.in_process, STATUS.pending];

export const STATUS_SUMMARY_ROUTES = {
  [STATUS.completed]: "#",
  [STATUS.in_process]: "#",
  [STATUS.pending]: "#",
};

export const SEARCH_FILTER_OPTIONS = [
  { label: "Todos", value: STATUS.all },
  { label: "Solo listas", value: STATUS.lists },
  { label: "Items completados", value: STATUS.completed },
  { label: "Items en proceso", value: STATUS.in_process },
  { label: "Items pendientes", value: STATUS.pending },
];
