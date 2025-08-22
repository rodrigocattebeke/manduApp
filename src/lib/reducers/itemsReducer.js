import { ITEMS_REDUCER_TYPES } from "@/constants/listsTypes";

export const itemsReducer = (state = {}, action) => {
  const newState = { ...state };
  const { type, payload } = action;

  switch (type) {
    case ITEMS_REDUCER_TYPES.ADD:
      newState[payload.id] = payload;
      return newState;
    case ITEMS_REDUCER_TYPES.ADD_ALL:
      let stateWithAll = { ...newState, ...payload };
      return stateWithAll;
    case ITEMS_REDUCER_TYPES.REMOVE:
      delete newState[payload.id];
      return newState;
    case ITEMS_REDUCER_TYPES.UPDATE:
      newState[payload.id] = { ...newState[payload.id], ...payload };
      return newState;
    default:
      return state;
  }
};
