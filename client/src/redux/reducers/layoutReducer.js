// src/redux/reducers/layoutReducer.js
import {
  TOGGLE_DROPDOWN,
  TOGGLE_CHAT,
  UPDATE_INTERACTION,
  HIDE_CHAT_ICON,
} from '../constants/actionTypes';

const initialState = {
  isOpen: false,
  isChatOpen: false,
  isChatIconVisible: false,
  lastInteraction: Date.now(),
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DROPDOWN:
      return { ...state, isOpen: !state.isOpen };

    case TOGGLE_CHAT:
      return { ...state, isChatOpen: !state.isChatOpen };

    case UPDATE_INTERACTION:
      return { ...state, lastInteraction: Date.now() };

    case HIDE_CHAT_ICON:
      return { ...state, isChatIconVisible: false };

    default:
      return state;
  }
};

export default layoutReducer;
