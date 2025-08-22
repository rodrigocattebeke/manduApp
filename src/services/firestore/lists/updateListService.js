import { db } from "@/lib/firebase";
import { doc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";

export async function updateListService(listID, newListData) {
  try {
    const listRef = doc(db, "lists", listID);

    const localTimestamp = Timestamp.fromDate(new Date());

    const newDataWithLocaleUpdatedAt = { ...newListData, updatedAt: localTimestamp };

    await updateDoc(listRef, { ...newDataWithLocaleUpdatedAt, updatedAt: serverTimestamp() });

    return { success: true, list: newDataWithLocaleUpdatedAt };
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
}
