"use client";
import { ITEMS_REDUCER_TYPES, LISTS_REDUCER_TYPES } from "@/constants/listsTypes";
import { itemsReducer } from "@/lib/reducers/itemsReducer";
import { listsReducer } from "@/lib/reducers/listsReducer";
import { addItemService } from "@/services/firestore/items/addItemService";
import { getAllListItemsService } from "@/services/firestore/items/getAllListItemsService";
import { addListService } from "@/services/firestore/lists/addListService";
import { getAllListsService } from "@/services/firestore/lists/getAllListsService";
import { getListService } from "@/services/firestore/lists/getListService";
import { updateListService } from "@/services/firestore/lists/updateListService";
import { getItemsById } from "@/utils/getItemsById";
import { isValidObj } from "@/utils/isValidObject";

const { useReducer, createContext, useState, useEffect } = require("react");

const ListsContext = createContext();

export function ListsProvider({ children }) {
  const [lists, listsDispatch] = useReducer(listsReducer, undefined);
  const [items, itemsDispatch] = useReducer(itemsReducer, undefined);
  const [isAllListsFetched, setIsAllListsFetched] = useState(false);
  const [isFirstItemsFetch, setIsFirstItemsFetch] = useState(true);

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
    if (isAllListsFetched && lists) return { success: true, lists }; //if lists have data, return

    const res = await getAllListsService();

    if (res.success) {
      const action = {
        type: LISTS_REDUCER_TYPES.ADD_ALL,
        payload: res.lists,
      };
      listsDispatch(action);

      // confirm the all list fetch
      setIsAllListsFetched(true);

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

  const addItem = async (listId, itemData) => {
    if (!listId) return console.error("Se necesita el id de la lista.");
    if (!isValidObj(itemData)) return console.error("Se debe de pasar un objeto válido con los datos del ítem.");

    const itemRes = await addItemService(listId, itemData);

    if (itemRes.success) {
      const action = {
        type: ITEMS_REDUCER_TYPES.ADD,
        payload: itemRes.item,
      };

      itemsDispatch(action);
      return {
        success: true,
        item: itemRes.item,
      };
    } else {
      return { success: false, error: "Hubo un error al crear el item: " + itemRes.error };
    }
  };

  const getAllListItems = async (listId) => {
    if (!listId) return console.error("Se debe de pasar el id de una lista");

    if (!isFirstItemsFetch && items && Object.values(getItemsById(listId, items)).length !== 0) return { success: true, items: getItemsById(listId, items) };

    const res = await getAllListItemsService(listId);

    if (res.success) {
      const action = {
        type: ITEMS_REDUCER_TYPES.ADD_ALL,
        payload: res.items,
      };
      itemsDispatch(action);

      // Set false the first items fetch
      setIsFirstItemsFetch(false);

      return { success: true, items: res.items };
    } else {
      return {
        success: false,
        error: res.error,
      };
    }
  };

  const listsService = {
    addList,
    getAllLists,
    getList,
    updateList,
  };

  const itemsService = {
    addItem,
    getAllListItems,
  };

  return <ListsContext.Provider value={{ listsService, itemsService, lists, items }}>{children}</ListsContext.Provider>;
}

export { ListsContext };
