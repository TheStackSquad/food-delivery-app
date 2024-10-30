// src/Motion/animation.js

export const slideVariants = {
  closed: {
    x: "-100%",
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  open: {
    x: "0%", // Change to "0%" to indicate starting position
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

export const menuItemVariants = {
  closed: {
    x: -20,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 1,
  },
};
