// src/redux/reducers/layoutReducer.js
import { TOGGLE_DROPDOWN, TOGGLE_CHAT, UPDATE_INTERACTION, HIDE_CHAT_ICON  } from '../actions/layoutActions';

const initialState = {
  isOpen: false,
  isChatIconVisible: false,
  isChatOpen: false,
  lastInteraction: Date.now(),
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DROPDOWN:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case TOGGLE_CHAT:
      return {
        ...state,
        isChatIconVisible: true, // Ensuring icon is visible when toggling
        isChatOpen: !state.isChatOpen,
        lastInteraction: Date.now(),
      };
    case UPDATE_INTERACTION:
      return {
        ...state,
        lastInteraction: Date.now(),
        isChatIconVisible: true, // Ensuring icon is visible on interaction
      };
      case HIDE_CHAT_ICON:
        return {
          ...state,
          isChatIconVisible: false, // Hide icon after timeout
        };
    default:
      return state;
  }
};

export default layoutReducer;
