import { db } from "@/lib/firebase";
import { doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";

export const updateItemService = async (itemId, newItemData) => {
  try {
    const itemRef = doc(db, "items", itemId);

    const localTimestamp = Timestamp.fromDate(new Date());

    const newDataWithLocaleUpdatedAt = { ...newItemData, updatedAt: localTimestamp };

    await updateDoc(itemRef, { ...newDataWithLocaleUpdatedAt, updatedAt: serverTimestamp() });

    return { success: true, item: newDataWithLocaleUpdatedAt };
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
};
