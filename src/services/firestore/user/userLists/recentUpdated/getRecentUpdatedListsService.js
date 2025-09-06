import { auth, db } from "@/lib/firebase";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

export const getRecentUpdatedListsService = async () => {
  try {
    const listsRef = collection(db, "lists");

    const q = query(listsRef, where("userUID", "==", auth.currentUser.uid), orderBy("updatedAt", "desc"), limit(6));

    const listsSnap = await getDocs(q);

    if (listsSnap.empty) return { success: true, updatedLists: {} };

    //transform snap array to object
    const lists = listsSnap.docs.reduce((prev, doc) => {
      const data = doc.data();
      prev[data.id] = data;
      return prev;
    }, {});

    return { success: true, updatedLists: lists };
  } catch (error) {
    return { success: false, error };
  }
};
