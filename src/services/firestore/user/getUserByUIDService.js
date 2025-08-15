import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getUserByUIDService = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return null;

    return { success: true, user: userSnap.data() };
  } catch (error) {
    return { success: false, error };
  }
};
