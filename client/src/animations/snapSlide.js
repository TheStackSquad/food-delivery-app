// src/animations/snapSlide.js
export const horizontalSlide = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

export const enhancedCardAnimation = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.9, y: -50, transition: { duration: 0.6, ease: 'easeIn' } },
};


//export const slideAnimation = {
//  hidden: { opacity: 0, y: 100 },
//  visible: { opacity: 1, y: 0 },
//  exit: { opacity: 0, y: -100 }
//};