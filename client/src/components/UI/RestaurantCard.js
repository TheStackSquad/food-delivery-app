// src/components/RestaurantCard.js
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { Card, CardHeader, CardContent } from '../UI/Card';
import styles from '../../css/Restaurant.module.css';

// StarRating Component (internal to RestaurantCard)
const StarRating = ({ rating }) => {
  return (
    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map((star) => (
        star <= rating ? (
          <AiFillStar key={star} className={`${styles.starIcon} ${styles.activeStar}`} />
        ) : (
          <AiOutlineStar key={star} className={`${styles.starIcon} ${styles.inactiveStar}`} />
        )
      ))}
    </div>
  );
};

// RestaurantCard Component
const RestaurantCard = ({ name, rating }) => {
  return (
    <Card className={styles.card}>
      <CardHeader className={styles.header}>
        <div className={styles.starRatingContainer}>
          <StarRating rating={rating} />
        </div>
      </CardHeader>
      <CardContent>
        <div className={styles.content}>
          <h3 className={styles.name}>{name}</h3>
          <button className={styles.cartButton}>
            <FaShoppingCart className={styles.cartIcon} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
