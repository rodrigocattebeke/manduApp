import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const searchService = async (searched) => {
  try {
    let items, lists;
    //Search in items
    const itemsRef = collection(db, "items");

    const itemsQuery = query(itemsRef, where("userUID", "==", auth.currentUser.uid), where("title", ">=", searched), where("title", "<=", searched + "\uf8ff"));

    const itemsSnap = await getDocs(itemsQuery);

    if (itemsSnap.empty) {
      items = {};
    } else {
      // Transform docs array to object
      items = itemsSnap.docs.reduce((acc, doc) => {
        const docData = doc.data();
        acc[docData.id] = docData;
        return acc;
      }, {});
    }

    //Search in lists
    const listsRef = collection(db, "lists");

    const listsQuery = query(listsRef, where("userUID", "==", auth.currentUser.uid), where("title", ">=", searched), where("title", "<=", searched + "\uf8ff"));

    const listsSnap = await getDocs(listsQuery);

    if (listsSnap.empty) {
      lists = {};
    } else {
      // Transform docs array to object
      lists = listsSnap.docs.reduce((acc, doc) => {
        const docData = doc.data();
        acc[docData.id] = docData;
        return acc;
      }, {});
    }

    return {
      success: true,
      results: {
        items,
        lists,
      },
    };
  } catch (error) {
    return { success: false, error };
  }
};
