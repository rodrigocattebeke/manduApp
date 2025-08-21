import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getAllListsService() {
  try {
    const listRef = collection(db, "lists");
    const q = query(listRef, where("userUID", "==", auth.currentUser.uid));

    const listSnap = await getDocs(q);

    if (listSnap.empty) return { success: true, list: {} };

    // Transform docs array to object
    const listsObject = listSnap.docs.reduce((acc, doc) => {
      const docData = doc.data();
      acc[docData.id] = docData;
      return acc;
    }, {});

    return { success: true, lists: listsObject };
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
}
