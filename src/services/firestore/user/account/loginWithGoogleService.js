import { singInWithGoogle } from "@/lib/firebase/auth";
import { getUserByUIDService } from "./getUserByUIDService";
import { db } from "@/lib/firebase";
import { doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";

//Function for create users in the DB
async function createUser(userRef, user) {
  try {
    const localTimestamp = Timestamp.fromDate(new Date());
    const userData = {
      userUID: user.userUID,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: localTimestamp,
    };

    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
    });

    return { success: true, user: userData };
  } catch (error) {
    console.error("Error creando usuario:", error);
    return {
      success: false,
      error: error.code || "unknown",
    };
  }
}

//Function for login, and if the user doesn't exist, create user in firestore db
export const loginWithGoogleService = async () => {
  try {
    const res = await singInWithGoogle();
    if (res.success) {
      const userRes = await getUserByUIDService(res.user.uid);
      console.log(userRes);
      // If the user doesn't exist in the DB, create user
      if (!userRes.success) {
        const initialUserValue = {
          userUID: res.user.uid,
          photoURL: res.user.photoURL,
          displayName: res.user.displayName,
        };

        const userRef = doc(db, "users", res.user.uid);

        const createUserRes = await createUser(userRef, initialUserValue);

        if (!createUserRes.success) {
          console.error("Error al crear usuario, intentelo mas tarde");
          return { success: false, error: createUserRes.error };
        }

        return { success: true, user: createUserRes.user };
      }

      return { success: true, user: userRes.user };
    }
  } catch (error) {
    U;
    console.log("Ocurrió un error al iniciar sesión, intente más tarde");
    return { success: false, error };
  }
};
