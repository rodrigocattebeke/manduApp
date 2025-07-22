export async function getStatusSummary() {
  return [
    { title: "Completados", quantity: 1, status: "completed" },
    { title: "En proceso", quantity: 2, status: "in_process" },
    { title: "Pendientes", quantity: 3, status: "pending" },
  ];
}
