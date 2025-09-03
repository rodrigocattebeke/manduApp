import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getFavoritesListsIdsService = async () => {
  const favoritesRef = doc(db, "favoritesListsIds", auth.currentUser.uid);
  try {
    const favoritesSnap = await getDoc(favoritesRef);

    if (!favoritesSnap.exists()) return { success: true, favorites: [] };

    return { success: true, favoritesIds: favoritesSnap.data().favoritesIds };
  } catch (error) {
    return { success: false, error };
  }
};
