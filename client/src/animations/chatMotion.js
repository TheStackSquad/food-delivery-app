// src/animations/chatMotion.js
export const chatBoxAnimation = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 30, scale: 0.95 },
  transition: { duration: 0.5, ease: "easeInOut" },
};

export const chatIconAnimation = {
  initial: { opacity: 1, scale: 0.85 },
  animate: { opacity: 1, scale: 1 }, // Removed 'y' adjustment
  transition: {
    duration: 0.5,
    ease: "easeInOut",
  },
};
