import { auth, db } from "@/lib/firebase";
import { arrayUnion, doc, setDoc } from "firebase/firestore";

export const addFavoriteListIdService = async (listId) => {
  if (!listId) return { success: false, error: "Se debe de pasar el id de una lista" };

  const favoritesRef = doc(db, "favoritesListsIds", auth.currentUser.uid);

  try {
    await setDoc(
      favoritesRef,
      {
        favoritesIds: arrayUnion(listId),
      },
      {
        merge: true,
      }
    );
    return { success: true };
  } catch (error) {
    return { succes: false, error };
  }
};
