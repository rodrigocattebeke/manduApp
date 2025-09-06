import { auth, db } from "@/lib/firebase";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

export const getRecentCreatedListsService = async () => {
  try {
    const listsRef = collection(db, "lists");

    const q = query(listsRef, where("userUID", "==", auth.currentUser.uid), orderBy("createdAt", "desc"), limit(6));

    const listsSnap = await getDocs(q);

    if (listsSnap.empty) return { success: true, recentLists: {} };

    //transform snap array to object
    const lists = listsSnap.docs.reduce((prev, doc) => {
      const data = doc.data();
      prev[data.id] = data;
      return prev;
    }, {});

    return { success: true, recentLists: lists };
  } catch (error) {
    return { success: false, error };
  }
};
