import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getListService(listID) {
  try {
    const listRef = doc(db, "lists", listID);
    const listSnap = await getDoc(listRef);
    if (!listSnap.exists()) return { success: false, error: "No se encontró la lista." };

    return { success: true, list: listSnap.data() };
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
}
