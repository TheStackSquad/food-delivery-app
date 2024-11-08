// components/animations/navbarSlide.js
//import { motion } from 'framer-motion';

//Card Slide Logic
export const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3
      }
    }
  };
  
  export const cardVariants = {
    hidden: {
      x: "100vw",
      opacity: 0
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 20
      }
    },
    exit: {
      x: "-100vw",
      opacity: 0,
      transition: {
        ease: "easeInOut"
      }
    }
  };