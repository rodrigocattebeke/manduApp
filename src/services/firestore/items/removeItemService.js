import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const removeItemService = async (itemId) => {
  const itemRef = doc(db, "items", itemId);

  try {
    await deleteDoc(itemRef);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
