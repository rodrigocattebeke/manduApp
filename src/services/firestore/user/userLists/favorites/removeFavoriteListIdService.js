import { auth, db } from "@/lib/firebase";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";

export const removeFavoriteListIdService = async (listId) => {
  if (!listId) return { success: false, error: "Se debe de pasar el id de la lista" };
  const favoriteRef = doc(db, "favoritesListsIds", auth.currentUser.uid);

  try {
    await updateDoc(favoriteRef, {
      favoritesIds: arrayRemove(listId),
    });

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
