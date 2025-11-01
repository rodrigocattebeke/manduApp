import { auth, db } from "@/lib/firebase";
import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from "firebase/firestore";

export const removeListService = async (listId) => {
  const batch = writeBatch(db);

  const listRef = doc(db, "lists", listId);

  const itemsRef = collection(db, "items");
  const q = query(itemsRef, where("userUID", "==", auth.currentUser.uid), where("listId", "==", listId));

  try {
    //Get all items of the list, and delete
    const itemsSnapshot = await getDocs(q);
    itemsSnapshot.forEach((itemDoc) => {
      batch.delete(itemDoc.ref);
    });

    //Delete list
    batch.delete(listRef);

    //Send batch
    await batch.commit();
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar lista e ítems:", error.message);
    return { success: false, error };
  }
};
