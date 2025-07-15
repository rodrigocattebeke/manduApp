"use client";

import { singInWithGoogle } from "@/lib/firebase/auth";
import { createContext, useState } from "react";
import { getDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const UserContext = createContext();

async function createUser(userRef, user) {
  try {
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error creando usuario:", error);
    return {
      success: false,
      error: error.code || "unknown",
      message: "No se pudo crear el usuario.",
    };
  }
}

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(undefined);

  //Login and if the user doesn't exist, create user in firestore db
  const loginWithGoogle = async () => {
    try {
      const user = await singInWithGoogle();
      setUserData({
        uid: user.uid,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });

      const userRef = doc(db, "users", user.uid);

      //Search the user in the DB
      try {
        //If getDoc returns error, the users doesn't exist in the db
        const userSnap = await getDoc(userRef);

        //Create the user if user doesn't exist (if don't throw error)
        if (!userSnap.exists()) {
          const res = await createUser(userRef, user);

          if (!res.success) console.log("Error al crear usuario"); //Manejo momentaneo, cambiar despues
        }
      } catch (error) {
        if (error.code === "permission-denied") {
          const res = await createUser(userRef, user);

          if (!res.success) console.log("Error al crear usuario"); //Manejo momentaneo, cambiar despues
        } else {
          console.log("Error desconocido, vuelve a intentarlo más tarde");
        }
      }
    } catch (error) {
      console.log("Ocurrió un error al iniciar sesión, intente más tarde");
    }
  };

  return <UserContext.Provider value={{ loginWithGoogle, userData }}>{children}</UserContext.Provider>;
};

export { UserContext };
