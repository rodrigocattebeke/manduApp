"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { updateDisplayNameService } from "@/services/firestore/user/updateDisplayNameService";
import { singOutService } from "@/services/firestore/user/singOutService";
import { observeAuthState } from "@/services/firestore/user/observeAuthState";
import { loginWithGoogleService } from "@/services/firestore/user/loginWithGoogleService";
import { getFavoritesListsIdsService } from "@/services/firestore/user/userLists/favorites/getFavoritesListsIdsService";
import { addFavoriteListIdService } from "@/services/firestore/user/userLists/favorites/addFavoriteListIdService";
import { removeFavoriteListIdService } from "@/services/firestore/user/userLists/favorites/removeFavoriteListIdService";
import { getListsByIdsService } from "@/services/firestore/lists/getListsByIdsService";
import { getRecentUpdatedListsService } from "@/services/firestore/user/userLists/recentUpdated/getRecentUpdatedListsService";
import { getRecentCreatedListsService } from "@/services/firestore/user/userLists/recentCreated/getRecentCreatedListsService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [favoritesLists, setFavoritesLists] = useState(undefined);
  const [isFavoritesChanged, setIsFavoritesChanged] = useState(true);
  const [recentCreatedLists, setRecentCreatedLists] = useState(undefined);
  const [recentUpdated, setRecentUpdated] = useState(undefined);
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

  //    User lists functions

  const addFavoriteListId = async (listId) => {
    if (!listId) return console.error("Se debe de pasar el id de la lista");

    const res = await addFavoriteListIdService(listId);

    if (res.success) {
      setUserData((prev) => ({ ...prev, favoritesListsIds: [...new Set([...(prev.favoritesListsIds || []), listId])] }));

      return { success: true };
    } else {
      return { success: false, error: res.error };
    }
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

  // Get the data of favorites lists
  const getFavoritesLists = async () => {
    if (!isFavoritesChanged && favoritesLists) return { success: true, lists: favoritesLists };
    if (!userData?.favoritesListsIds) return { success: false, error: "No hay listas favoritas" };
    const res = await getListsByIdsService(userData.favoritesListsIds);

    if (res.success) {
      setFavoritesLists(res.lists);
      setIsFavoritesChanged(false);
      return { success: true, lists: res.lists };
    } else {
      return { success: false, error: res.error };
    }
  };

  //Check if user favorites changed for refetch
  useEffect(() => {
    if (userData && userData.favoritesListsIds) {
      setIsFavoritesChanged(true);
    }
  }, [userData]);

  const removeFavoriteListId = async (listId) => {
    if (!listId) return console.error("Se debe de pasar el id de la lista a agregar");

    const res = await removeFavoriteListIdService(listId);
    if (res.success) {
      setUserData((prev) => ({ ...prev, favoritesListsIds: [...prev.favoritesListsIds.filter((id) => id !== listId)] }));
      return { success: true };
    } else {
      return { success: false, error: res.error };
    }
  };

  // Recent Created

  const getRecentCreatedLists = async () => {
    if (recentCreatedLists) return { success: true, recentLists: recentCreatedLists };
    const res = await getRecentCreatedListsService();
    if (res.success) {
      setRecentCreatedLists(res.recentLists);
      return { success: true, recentLists: res.recentLists };
    } else {
      return { success: false, error: res.error };
    }
  };

  // Recent updated

  const getRecentUpdatedLists = async () => {
    if (recentUpdated) return { success: true, updatedLists: recentUpdated };
    const res = await getRecentUpdatedListsService();
    if (res.success) {
      setRecentUpdated(res.updatedLists);
      return { success: true, updatedLists: res.updatedLists };
    } else {
      return { success: false, error: res.error };
    }
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
    getFavoritesLists,
    getRecentCreatedLists,
    getRecentUpdatedLists,
    removeFavoriteListId,
  };

  if (isLoading) return null; //for the moment, return null

  return <UserContext.Provider value={{ loginWithGoogle, singOut, userData, userFunctions }}>{children}</UserContext.Provider>;
};

export { UserContext };
