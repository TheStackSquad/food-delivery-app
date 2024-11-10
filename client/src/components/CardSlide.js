// components/CardSlide.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { containerVariants, cardVariants } from '../animations/cardSlider';
import styles from '../css/CardSlide.module.css';
import { cards } from '../data/cardSlideData';

function CardSlide() {

  const navigate = useNavigate();

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
          <h3 dangerouslySetInnerHTML={{ __html: card.title }} />
          <p>{card.content}</p>
          <button onClick={() => navigate(card.route)}>
            {card.buttonText}
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default CardSlide;
