import { db } from "@/lib/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export async function updateListService(listID, newListData) {
  try {
    const listRef = doc(db, "lists", listID);

    const newDataWithUpdatedAt = { ...newListData, updatedAt: serverTimestamp() };

    await updateDoc(listRef, newDataWithUpdatedAt);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
}
