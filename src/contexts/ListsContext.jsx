"use client";
import { ITEMS_REDUCER_TYPES, LISTS_REDUCER_TYPES } from "@/constants/listsTypes";
import { itemsReducer } from "@/lib/reducers/itemsReducer";
import { listsReducer } from "@/lib/reducers/listsReducer";
import { getAllListItemsService } from "@/services/firestore/items/getAllListItemsService";
import { addListService } from "@/services/firestore/lists/addListService";
import { getAllListsService } from "@/services/firestore/lists/getAllListsService";
import { getListService } from "@/services/firestore/lists/getListService";
import { updateListService } from "@/services/firestore/lists/updateListService";

const { useReducer, createContext, useEffect } = require("react");

const ListsContext = createContext();

export function ListsProvider({ children }) {
  const [lists, listsDispatch] = useReducer(listsReducer, undefined);
  const [items, itemsDispatch] = useReducer(itemsReducer, undefined);

  //Lists functions

  const addList = async (listData) => {
    const listRes = await addListService(listData);

    if (listRes.success) {
      const action = {
        type: LISTS_REDUCER_TYPES.ADD,
        payload: listRes.list,
      };

      listsDispatch(action);
      return {
        success: true,
        list: listRes.list,
      };
    } else {
      return { success: false, error: "Hubo un error al crear la lista: " + listRes.error };
    }
  };

  const getAllLists = async () => {
    if (lists) return { success: true, lists }; //if lists have data, return

    const res = await getAllListsService();

    if (res.success) {
      const action = {
        type: LISTS_REDUCER_TYPES.ADD_ALL,
        payload: res.lists,
      };
      listsDispatch(action);

      return { success: true, lists: res.lists };
    } else {
      return {
        success: false,
        error: res.error,
      };
    }
  };

  const getList = async (listId) => {
    if (!listId) return console.error("Se necesita pasar el id de la lista");

    if (lists && lists[listId]) return lists[listId];
    const listRes = await getListService(listId);

    if (listRes.success) {
      const action = {
        type: LISTS_REDUCER_TYPES.ADD,
        payload: listRes.list,
      };

      listsDispatch(action);
      return {
        success: true,
        list: listRes.list,
      };
    } else {
      return { success: false, error: "Hubo un error al obtener la lista: " + listRes.error };
    }
  };

  const updateList = async (listId, newListData) => {
    if (!listId) return console.error("Se necesita pasar el id de la lista.");
    if (!newListData || typeof newListData !== "object" || Array.isArray(newListData) || Object.keys(newListData).length === 0) return console.error("Se necesita pasar un objeto con la nueva información de la lista.");

    const listWithId = { ...newListData, id: listId };

    const listRes = await updateListService(listId, listWithId);

    if (listRes.success) {
      const listUpdated = listRes.list;
      const action = {
        type: LISTS_REDUCER_TYPES.UPDATE,
        payload: listUpdated,
      };

      listsDispatch(action);

      return { success: true, list: listUpdated };
    } else {
      return { success: false, error: listRes.error };
    }
  };

  //Items Functions

  const listsService = {
    addList,
    getAllLists,
    getList,
    updateList,
  };

  return <ListsContext.Provider value={{ listsService, lists, items }}>{children}</ListsContext.Provider>;
}

export { ListsContext };
