import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const updateUserDataService = async (newUserData) => {
  if (!newUserData.displayName || !newUserData.photoURL) return "No se pasaron los datos necesarios. Para actualizar, se necesita: displayName y photoURL";

  const uid = auth.currentUser.uid;
  try {
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      displayName: newUserData.displayName,
      photoURL: newUserData.photoURL,
    });

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
