import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export const singOutService = async () => {
  if (!auth.currentUser) return;
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
