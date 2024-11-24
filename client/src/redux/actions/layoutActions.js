// src/redux/actions/layoutActions.js
import {
  TOGGLE_DROPDOWN,
  TOGGLE_CHAT,
  UPDATE_INTERACTION,
  HIDE_CHAT_ICON,
} from '../constants/actionTypes';

export const toggleDropdown = () => ({
  type: TOGGLE_DROPDOWN,
});

export const toggleChat = () => ({
  type: TOGGLE_CHAT,
});

export const updateInteraction = () => ({
  type: UPDATE_INTERACTION,
});

export const hideChatIcon = () => ({
  type: HIDE_CHAT_ICON,
});
