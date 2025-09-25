import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserByUIDService } from "./getUserByUIDService";

export const observeAuthState = (callback) => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRes = await getUserByUIDService(user.uid);
      if (userRes.success) {
        callback({ user: userRes.user });
      } else {
        callback({ user: null });
      }
    } else {
      callback({ user: null });
    }
  });

  return unsubscribe;
};
