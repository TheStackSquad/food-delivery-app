// components/CardSlide.js
import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, cardVariants } from '../animations/cardSlider';
import styles from '../css/CardSlide.module.css';

function CardSlide() {
  const cards = [
    { id: 1, title: "Card 1", content: "Content for card 1" },
    { id: 2, title: "Card 2", content: "Content for card 2" },
    { id: 3, title: "Card 3", content: "Content for card 3" },
    { id: 4, title: "Card 4", content: "Content for card 4" },
    { id: 5, title: "Card 5", content: "Content for card 5" }
  ];

  return (
    <motion.div 
      className={styles.cardContainer}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className={styles.card}
          variants={cardVariants}
          whileHover={{ scale: 1.05 }}
        >
          <h3>{card.title}</h3>
          <p>{card.content}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default CardSlide;