export const isValidObj = (Obj) => {
  if (!Obj || typeof Obj !== "object" || Array.isArray(Obj) || Object.keys(Obj).length === 0) return false;

  return true;
};
