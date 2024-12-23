//client/src/Pages/VendorRoutes/Vendorlogin.js
// VendorLogin Component
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../css/vendorLogin.module.css";
import Alert from "../../components/UI/Alert";
import { validateEmail, validatePassword } from "../../frontendUtils/validation";
import { vendorLogin } from "../../API/signIn";
import { loginVendorAction } from "../../redux/actions/vendorActions";


function VendorLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const vendorState = useSelector((state) => state);

  // Log entire Redux state
  console.log('Full Redux State:', vendorState);

  console.log('Vendor Auth State:', vendorState.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  console.log('Login Data:', formData.email);


  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    isVisible: false,
    type: "info",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const showAlert = (type, message) => {
    setAlertInfo({
      isVisible: true,
      type,
      message,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
        // Destructure email and password from formData
    const { email, password } = formData;

    // Validate inputs
    const newErrors = {};
    const emailCheck = validateEmail(email);
    const passwordCheck = validatePassword(password);
    if (!emailCheck.isValid) newErrors.email = emailCheck.error;
    if (!passwordCheck.isValid) newErrors.password = passwordCheck.error;
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    
    try {
      const response = await vendorLogin(email, password);
      console.log('FULL RESPONSE:', response);
  
      const vendorData = {
        vendor: response.vendor,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        sessionData: response.sessionData,
      };
      
      console.log('DISPATCH DATA:', vendorData);
      
      dispatch(loginVendorAction(vendorData)); // Dispatch full vendorData
      
      localStorage.setItem("vendorData", JSON.stringify(vendorData)); // Persist data

      showAlert("success", "Login successful!");
  
      setTimeout(() => {
        navigate("/vendor/dashboard");
      }, 1500);
    } catch (error) {
      console.error("COMPLETE LOGIN ERROR:", {
        error,
        fullError: error,
        responseDetails: error.response
      });
      showAlert(
        "error",
        error.response?.data?.message || error.message || 'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    navigate('/vendor/signup');
  };

  return (
    <div className={`${styles.gridContainer} ${styles.login}`}>
      <div className={styles.formWrap}>
        <Alert
          isVisible={alertInfo.isVisible}
          type={alertInfo.type}
          message={alertInfo.message}
          onClose={() => setAlertInfo({ ...alertInfo, isVisible: false })}
        />

        <h2>Vendor Login</h2>

        <form className={styles.formGrid} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <label htmlFor="email">Email</label>
            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <label htmlFor="password">Password</label>
            {errors.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
          </div>

          <div className={styles.btnWrapLogin}>
            <button
              type="submit"
              className={styles.button}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <button
          onClick={handleSignupRedirect}
          className={styles.buttonSubmit}
          type="button"
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
}

export default VendorLogin;
