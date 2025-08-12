"use client";

import { singInWithGoogle } from "@/lib/firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";

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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  //Function for login, and if the user doesn't exist, create user in firestore db
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

  //Detect if there is no user logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserData({
          uid: user.uid,
          photoURL: user.photoURL,
          displayName: user.displayName,
        });
        if (pathname == "/login") router.push("/");
        setIsLoading(false);
      } else if (!user && pathname !== "/login") {
        router.push("/login");
      } else if (user && pathname == "/login") {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [auth, pathname]);

  // Detect if the current page is /login, and remove loader

  useEffect(() => {
    if (pathname === "/login") {
      setIsLoading(false);
    }
  }, [pathname]);

  // SignOut
  const logOut = async () => {
    if (!auth.currentUser) return;
    try {
      await signOut(auth);
    } catch (error) {
      return console.error("Ocurrió un error al cerrar sesión: " + error);
    }
  };

  if (isLoading) return null; //for the moment, return null

  return <UserContext.Provider value={{ loginWithGoogle, logOut, userData }}>{children}</UserContext.Provider>;
};

export { UserContext };
