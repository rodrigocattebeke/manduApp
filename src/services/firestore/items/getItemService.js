import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getItemService = async (itemId) => {
  try {
    const itemRef = doc(db, "items", itemId);
    const itemSnap = await getDoc(itemRef);
    if (!itemSnap.exists()) return { success: false, error: "No se encontró el ítem." };

    return { success: true, item: itemSnap.data() };
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
};
