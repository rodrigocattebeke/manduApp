import { LISTS_REDUCER_TYPES } from "@/constants/listsTypes";

export const listsReducer = (state = {}, action) => {
  const newState = { ...state };
  const { type, payload } = action;

  switch (type) {
    case LISTS_REDUCER_TYPES.ADD:
      newState[payload.id] = payload;
      return newState;
    case LISTS_REDUCER_TYPES.ADD_ALL:
      let stateWithAll = { ...newState, ...payload };
      return stateWithAll;
    case LISTS_REDUCER_TYPES.REMOVE:
      delete newState[payload.id];
      return newState;
    case LISTS_REDUCER_TYPES.UPDATE:
      newState[payload.id] = { ...newState[payload.id], ...payload };
      return newState;
    default:
      return state;
  }
};
