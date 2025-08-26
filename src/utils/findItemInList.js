export const findItemInList = (listId = "", itemsObj) => {
  if (!itemsObj || typeof itemsObj !== "object" || Array.isArray(itemsObj)) return console.error("Se debe de pasar un objeto con los items a filtrar");

  const items = Object.entries(itemsObj).reduce((acc, [id, data]) => {
    if (data.listId == listId) {
      acc[id] = data;
    }
    return acc;
  }, {});
  return items;
};
