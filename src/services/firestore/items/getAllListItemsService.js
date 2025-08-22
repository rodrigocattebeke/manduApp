import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getAllListItemsService(listId) {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("userUID", "==", auth.currentUser.uid), where("listId", "==", listId));

    const itemsSnap = await getDocs(q);

    if (itemsSnap.empty) return { success: true, items: {} };

    // Transform docs array to object
    const itemsObject = itemsSnap.docs.reduce((acc, doc) => {
      const docData = doc.data();
      acc[docData.id] = docData;
      return acc;
    }, {});

    return { success: true, items: itemsObject };
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
}
