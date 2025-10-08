export const STATUS = {
  all: "all",
  lists: "lists",
  items: "items",
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

export const SEARCH_FILTER_OPTIONS = {
  [STATUS.all]: { label: "Todos", value: STATUS.all },
  [STATUS.lists]: { label: "Solo listas", value: STATUS.lists },
  [STATUS.items]: { label: "Solo items", value: STATUS.items },
  [STATUS.completed]: { label: "Items completados", value: STATUS.completed },
  [STATUS.in_process]: { label: "Items en proceso", value: STATUS.in_process },
  [STATUS.pending]: { label: "Items pendientes", value: STATUS.pending },
};

export const SEARCH_FILTER_ORDER = [STATUS.all, STATUS.lists, STATUS.items, STATUS.completed, STATUS.in_process, STATUS.pending];
