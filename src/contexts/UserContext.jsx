"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { updateDisplayNameService } from "@/services/firestore/user/updateDisplayNameService";
import { singOutService } from "@/services/firestore/user/singOutService";
import { observeAuthState } from "@/services/firestore/user/observeAuthState";
import { loginWithGoogleService } from "@/services/firestore/user/loginWithGoogleService";

import { Loader } from "@/components/loader/Loader";
import { getFavoritesListsIdsService } from "@/services/firestore/user/userLists/favorites/getFavoritesListsIdsService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  //Function for login, and if the user doesn't exist, create user in firestore db
  const loginWithGoogle = async () => {
    const userData = await loginWithGoogleService();

    if (userData.success) {
      return { success: true };
    } else {
      console.error("Ocurrio un error al iniciar sesion, intentelo más tarde. " + userData.error);
      return { success: false, error: userData.error };
    }
  };

  //Detect if there is no user logged in
  useEffect(() => {
    const unsubscribe = observeAuthState(({ user }) => {
      if (user) {
        setUserData(user);
        setIsLoading(false);
      }

      if (!user && pathname !== "/login") router.push("/login");
      if (user && pathname == "/login") router.push("/");
    });

    return () => unsubscribe();
  }, [pathname]);

  // Detect if the current page is /login, and remove loader

  useEffect(() => {
    if (pathname === "/login") {
      setIsLoading(false);
    }
  }, [pathname]);

  // SignOut
  const singOut = async () => {
    const res = singOutService();
    if (res.success) {
      setUserData(null);
    }
  };

  //functions for update user information
  const updateUserDisplayName = async (newName) => {
    const res = await updateDisplayNameService(newName);

    if (res.success) {
      setUserData({ ...userData, displayName: newName });
      return { success: true };
    } else {
      console.error("Ocurrio un error al cambiar el nombre");
      return { success: false, error: res.error };
    }
  };

  // user favorites function

  const addFavoriteListId = (listId) => {
    if (!listId) return console.error("Se debe de pasar el id de la lista");
    setUserData((prev) => ({ ...prev, favoritesListsIds: [...new Set([...(prev.favoritesListsIds || []), listId])] }));
  };

  //Get the ids of favorites list in Firestore
  const getFavoritesListsIds = async () => {
    const res = await getFavoritesListsIdsService();

    if (res.success) {
      setUserData((prev) => ({ ...prev, favoritesListsIds: res.favoritesIds }));
      return { success: true };
    } else {
      return { success: false, error: res.error };
    }
  };

  const removeFavoriteListId = (listId) => {
    if (!listId) return console.error("Se debe de pasar el id de la lista a agregar");

    setUserData((prev) => ({ ...prev, favoritesListsIds: [...prev.favoritesListsIds.filter((id) => id !== listId)] }));
  };

  useEffect(() => {
    if (!userData || userData.favoritesListsIds) return; //If the userData already have favoritesLists, return
    const getFavs = async () => {
      await getFavoritesListsIds();
    };
    getFavs();
  }, [userData]);

  //Put all user functions into a object
  const userFunctions = {
    updateDisplayName: (name) => {
      return updateUserDisplayName(name);
    },
    addFavoriteListId,
    removeFavoriteListId,
  };

  if (isLoading) return <Loader fullScreen="true" backdrop="true" />;
  return <UserContext.Provider value={{ loginWithGoogle, singOut, userData, userFunctions }}>{children}</UserContext.Provider>;
};

export { UserContext };
