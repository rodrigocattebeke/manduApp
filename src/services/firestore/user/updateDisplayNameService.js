import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const updateDisplayNameService = async (uid, newName) => {
  try {
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      displayName: newName,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
