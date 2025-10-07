import { SEARCH_FILTER_OPTIONS } from "@/constants/statuses";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const searchService = async (searched, filter) => {
  try {
    let items = {},
      lists = {};

    //Search in items
    if (filter !== SEARCH_FILTER_OPTIONS.lists.value) {
      const itemsRef = collection(db, "items");
      let itemsQuery;
      if (filter == SEARCH_FILTER_OPTIONS.all.value) {
        itemsQuery = query(itemsRef, where("userUID", "==", auth.currentUser.uid), where("title", ">=", searched), where("title", "<=", searched + "\uf8ff"));
      } else {
        itemsQuery = query(itemsRef, where("userUID", "==", auth.currentUser.uid), where("title", ">=", searched), where("title", "<=", searched + "\uf8ff"), where("status", "==", filter));
      }

      const itemsSnap = await getDocs(itemsQuery);

      if (!itemsSnap.empty) {
        // Transform docs array to object
        items = itemsSnap.docs.reduce((acc, doc) => {
          const docData = doc.data();
          acc[docData.id] = docData;
          return acc;
        }, {});
      }
    }

    //Search in lists

    if (filter == SEARCH_FILTER_OPTIONS.all.value || filter == SEARCH_FILTER_OPTIONS.lists.value) {
      const listsRef = collection(db, "lists");

      const listsQuery = query(listsRef, where("userUID", "==", auth.currentUser.uid), where("title", ">=", searched), where("title", "<=", searched + "\uf8ff"));

      const listsSnap = await getDocs(listsQuery);

      if (!listsSnap.empty) {
        // Transform docs array to object
        lists = listsSnap.docs.reduce((acc, doc) => {
          const docData = doc.data();
          acc[docData.id] = docData;
          return acc;
        }, {});
      }
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
