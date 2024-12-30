//client/src/Pages/RiderRoutes/RiderLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { riderLogin } from "../../API/signIn";
import styles from "../../css/Login.module.css";
import "react-toastify/dist/ReactToastify.css";

const RiderLogin = () => {
  // State management for form inputs and loading
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.debug("Attempting login with email:", email);
      const response = await riderLogin(email, password);
      console.debug("Login successful:", response);
      toast.success("Login successful! Redirecting...");

      // Clear inputs
      setEmail("");
      setPassword("");

      // Redirect to profile page
      setTimeout(() => {
        navigate("/rider/profile");
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.blob}></div>
      <div className={styles.blob2}></div>

      {/* Login form container */}
      <div className={styles.loginCard}>
        <h1 className={styles.header}>Welcome Back! <br /> Relax & Order</h1>

        {loading ? (
          <div className="spinner">Loading...</div>
        ) : (
          <form onSubmit={handleLogin} className={styles.form}>
            {/* Email input */}
            <div className={styles.inputGroup}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="email">Email Address</label>
              <div className={styles.inputLineLogin}></div>
            </div>

            {/* Password input */}
            <div className={styles.inputGroup}>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="password">Password</label>
              <div className={styles.inputLineLogin}></div>
            </div>

            {/* Forgot username link */}
            <a href="/menu" className={styles.forgotLink}>
              Forgot your username?
            </a>

            {/* Submit button */}
            <button type="submit" className={styles.submitButton}>
              Login
            </button>

            {/* Sign-up prompt */}
            <p className={styles.signupText}>
              Don't have an account? <a href="/rider/signup">Sign up here</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default RiderLogin;
