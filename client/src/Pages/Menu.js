// client/src/Pages/Menu.js
import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { fetchMealsByCategory } from '../API/fetchMeal';
import { Card, CardContent, CardHeader, CardTitle } from '../components/UI/menuCard';
import Dropdown from '../components/UI/dropdown';
import { formatImagePath } from '../frontendUtils/pathFormatter';
import styles from '../css/Menu.module.css';
import 'react-toastify/dist/ReactToastify.css';

// Constants for vendor categories
const VENDOR_TYPES = [
  { value: 'all', label: 'All Vendors' },
  { value: 'Ice Cream', label: 'Ice Cream' },
  { value: 'Alcohol Beverages', label: 'Alcohol Beverages' },
  { value: 'Chinese Cuisines', label: 'Asian Cuisines' },
  { value: 'African Food', label: 'Traditional' },
  { value: 'Bakery Delight', label: 'Bakery Delight' },
];

// Utility function to update cart count in localStorage and UI
const updateCartCount = (count) => {
  console.log('Updating cart count:', count);
  // Implementation for updating cart count in navigation would go here
};

// Utility function to handle cart operations
const handleCartOperation = (meal) => {
  console.log('Processing cart operation for meal:', meal);
  
  // Get existing cart items or initialize empty array
  const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  // Check if item already exists in cart
  const existingItemIndex = existingCart.findIndex(item => item._id === meal._id);
  
  if (existingItemIndex !== -1) {
    console.log('Updating quantity for existing item');
    existingCart[existingItemIndex].quantity += 1;
  } else {
    console.log('Adding new item to cart');
    existingCart.push({ ...meal, quantity: 1 });
  }
  
  // Update localStorage
  localStorage.setItem('cartItems', JSON.stringify(existingCart));
  
  // Update cart count and show notification
  updateCartCount(existingCart.length);
  return existingCart.length;
};

const Menu = () => {
  // State declarations
  const [selectedType, setSelectedType] = useState('all');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Effect hook to fetch meals when category changes
  useEffect(() => {
    const loadMeals = async () => {
      console.log('Loading meals for category:', selectedType);
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchMealsByCategory(selectedType);
        console.log('Fetched meals:', data);
        setMeals(data);
      } catch (err) {
        console.error('Error loading meals:', err);
        setError('Failed to load meals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadMeals();
  }, [selectedType]);

  // Event Handlers
  const handleCategoryChange = (category) => {
    console.log('Category changed to:', category);
    setSelectedType(category);
  };

  const handleAddToCart = (meal) => {
    console.log('Adding to cart:', meal);
     // eslint-disable-next-line
    const cartCount = handleCartOperation(meal);
    toast.success(`Added ${meal.mealName} to cart`);
  };

  // Render Methods
  const renderMealCard = (meal) => (
    <Card key={meal._id} className={styles.cardHover}>
      <div className={styles.cardImageContainer}>
        <div 
          className={styles.cardImage}
          style={{
            backgroundImage: `url(${formatImagePath(meal.image)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <button 
          className={styles.cartButton}
          onClick={() => handleAddToCart(meal)}
          aria-label="Add to cart"
        >
          <FaShoppingCart />
        </button>
      </div>
      <CardHeader>
        <CardTitle>{meal.mealName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.mealInfo}>
          <p className={styles.vendorType}>{meal.category}</p>
          <p className={styles.description}>{meal.description}</p>
          <p className={styles.price}>
            ₦{meal.price.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  // Main render
  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.filterWrap}>
        <Dropdown
          onChange={handleCategoryChange}
          options={VENDOR_TYPES}
          defaultValue="all"
          placeholder="Select vendor type"
        />
      </div>

      <section className={styles.sectionWrap}>
        <h2 className={styles.sectionTitle}>
          {selectedType === 'all' ? 'All Vendors' : `Vendors in ${selectedType}`}
        </h2>
        
        {error && <p className={styles.error}>{error}</p>}
        
        {loading ? (
          <div className={styles.loading}>Loading vendors...</div>
        ) : (
          <div className={styles.gridContainer}>
            {meals.length === 0 ? (
              <p>No meals found in this category.</p>
            ) : (
              meals.map(renderMealCard)
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Menu;