import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getListsByIdsService = async (listsIdsArray) => {
  if (!listsIdsArray || !Array.isArray(listsIdsArray)) return { success: false, error: "se debe de pasar un array con los ids de las listas" };

  const listRef = collection(db, "lists");

  try {
    const q = query(listRef, where("id", "in", listsIdsArray), where("userUID", "==", auth.currentUser.uid));

    const listsSnap = await getDocs(q);
    if (listsSnap.empty) return { success: true, lists: {} };

    const listsObject = listsSnap.docs.reduce((prev, doc) => {
      const data = doc.data();
      prev[doc.id] = data;
      return prev;
    }, {});

    return { success: true, lists: listsObject };
  } catch (error) {
    return { success: false, error };
  }
};
