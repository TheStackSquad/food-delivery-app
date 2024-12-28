// client/src/utils/cartUtils.js
export const addToCart = (meal) => {
    try {
      // Get existing cart items or initialize empty array
      const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      
      // Check if item already exists in cart
      const existingItemIndex = existingCart.findIndex(item => item._id === meal._id);
      
      if (existingItemIndex !== -1) {
        // Increment quantity if item exists
        existingCart[existingItemIndex].quantity += 1;
      } else {
        // Add new item with quantity 1
        existingCart.push({ ...meal, quantity: 1 });
      }
      
      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(existingCart));
      
      // Dispatch custom event for cart update
      window.dispatchEvent(new Event('cartUpdated'));
      
      return existingCart.length;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return 0;
    }
  };

  
export const getCartCount = () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      return cartItems.length;
    } catch (error) {
      console.error('Error getting cart count:', error);
      return 0;
    }
  };
  