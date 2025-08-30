import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const removeListService = async (listId) => {
  const listRef = doc(db, "lists", listId);

  try {
    await deleteDoc(listRef);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
