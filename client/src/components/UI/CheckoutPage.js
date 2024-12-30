//client/src/components/UI/CheckoutPage.js

// Imports
import React, { useState, useEffect } from "react"; // React hooks
import { useNavigate } from "react-router-dom"; // Navigation
import { useSelector } from "react-redux"; // Access Redux state
import CartBadge from "../CartBadge"; //import cartBadge for prop drilling
import styles from "../../css/Checkout.module.css"; // CSS module

const CheckoutPage = () => {
  // State for cart items
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  // State for delivery form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  // Navigation hook
  const navigate = useNavigate();

  // Redux selector to get user data
  const userData = useSelector((state) => state?.auth?.user);
  console.log("Redux user data:", userData);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      try {
        const items = JSON.parse(storedCartItems);
        setCartItems(items);
        updateCartCount(items); // Update cart count on mount
      } catch (error) {
        console.error("Error parsing cart items from localStorage:", error);
      }
    }
  }, []);

  const updateCartCount = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };
  // Remove a meal from the cart
  const removeCartItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    updateCartCount(updatedCart); // Update cart count after removing
  };

  // Calculate subtotal, delivery fee, and total
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 5.99;
  const total = subtotal + deliveryFee;

    
  // Form validation
  const isValidPhone = /^[0-9]{10,15}$/.test(formData.phone);
  const isValid = formData.name && isValidPhone && formData.address;

  // Fetch cart items from localStorage
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      try {
        setCartItems(JSON.parse(storedCartItems));
        console.log("Cart items loaded from localStorage:", storedCartItems);
      } catch (error) {
        console.error("Error parsing cart items from localStorage:", error);
      }
    }

    // Populate form fields dynamically if user data exists
    if (userData) {
      setFormData((prevData) => ({
        ...prevData,
        name: userData.username || "",
        phone: userData.phone || "",
        address: userData.address || "",
      }));
    }
  }, [userData]); 

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    console.log(`Updated formData:`, formData);
  };

  return (
    <div className={styles.container}>
       <CartBadge count={cartCount} /> {/* Include CartBadge */}
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Checkout</h1>

        <div className={styles.grid}>
          {/* Order Summary */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Order Summary</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className={styles.cartItem}>
                  <div className={styles.itemInfo}>
                    <p>{item.mealName}</p>
                    <p className={styles.quantity}>Quantity: {item.quantity}</p>
                  </div>
                  <p>₦{(item.price * item.quantity).toLocaleString()}</p>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeCartItem(item._id)}
                  >
                    -
                  </button>
                </div>
              ))
            ) : (
              <p className={styles.emptyCart}>Your cart is empty.</p>
            )}

            {cartItems.length > 0 && (
              <div>
                <div className={styles.summaryItem}>
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Delivery Fee</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className={`${styles.summaryItem} ${styles.total}`}>
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Delivery Details */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Delivery Details</h2>
            <form>
              {/* Name */}
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Name"
                />
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
              </div>

              {/* Phone */}
              <div className={styles.formGroup}>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Phone"
                />
                <label htmlFor="phone" className={styles.label}>
                  Phone Number
                </label>
                  {!isValidPhone && formData.phone && (
                  <div className={styles.error}>
                    Please enter a valid phone number.
                  </div>
                )}
              </div>

              {/* Address */}
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Address"
                />
                <label htmlFor="address" className={styles.label}>
                  Delivery Address
                </label>
              </div>

              {/* Notes */}
              <div className={styles.formGroup}>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  placeholder="Delivery Notes (Optional)"
                />
                <label htmlFor="notes" className={styles.label}>
                  Delivery Notes (Optional)
                </label>
              </div>

              {/* Proceed to Payment Button */}
              <button
                disabled={!isValid}
                className={styles.button}
                onClick={() => navigate("/payment")}
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
