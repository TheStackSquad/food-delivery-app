// src/Motion/animation.js

// Animation for the dropdown container, with a slide-in effect and staggered item display
export const dropdownVariants = {
  hidden: { opacity: 0, y: -10 }, // Starts hidden and slightly above
  visible: {
    opacity: 1,
    y: 0, // Moves to the original position
    transition: {
      staggerChildren: 0.1, // Delays each item's appearance for a staggered effect
    },
  },
};

// Animation for each dropdown item, controls visibility with opacity
export const itemVariants = {
  hidden: { opacity: 0 }, // Initially hidden
  visible: { opacity: 1 }, // Fully visible when dropdown is open
};

