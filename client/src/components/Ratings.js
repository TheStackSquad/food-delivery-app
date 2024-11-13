// src/components/Restaurant.js
import React from 'react';
import RestaurantCard from '../components/UI/RestaurantCard';
import styles from '../css/Restaurant.module.css';

const Restaurant = () => {
    // eslint-disable-next-line
  const [restaurants, setRestaurants] = React.useState([
    { id: 1, name: "Joe's Diner", ratings: [5, 5, 5, 4, 5] },
    { id: 2, name: 'Pizza Palace', ratings: [2, 2, 2, 2, 5] },
    { id: 3, name: 'Sushi Stop', ratings: [4, 4, 3, 4, 4] },
  ]);

  const getModeRating = (ratings) => {
    const frequency = {};
    let maxFreq = 0;
    let modeRating = ratings[0];

    ratings.forEach((rating) => {
      frequency[rating] = (frequency[rating] || 0) + 1;
      if (frequency[rating] > maxFreq) {
        maxFreq = frequency[rating];
        modeRating = rating;
      }
    });

    return modeRating;
  };

  const sortedRestaurants = [...restaurants].sort((a, b) => getModeRating(b.ratings) - getModeRating(a.ratings));

  return (
    <div className={styles.container}>
      {sortedRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} name={restaurant.name} rating={getModeRating(restaurant.ratings)} />
      ))}
    </div>
  );
};

export default Restaurant;
