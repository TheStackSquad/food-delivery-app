// src/redux/actions/layoutActions.js
export const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';
export const TOGGLE_CHAT = 'TOGGLE_CHAT';
export const UPDATE_INTERACTION = 'UPDATE_INTERACTION';
export const HIDE_CHAT_ICON = 'HIDE_CHAT_ICON';

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