//client/src/components/UI/ProtectedRoute.js

import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../css/ProtectedRoute.css";
import placeholderImage from "../../asset/img/vendorProfile/protectedRoute.webp";

const ProtectedRoute = () => {
  // For ProtectedRoute component
  const isAuthenticated = useSelector(() => {
    const vendorState = localStorage.getItem('persist:vendor');
    if (!vendorState) return false;
  
    try {
      const parsedState = JSON.parse(vendorState);
      return parsedState.isAuthenticated;
    } catch (error) {
      console.log('Error parsing vendor state:', error);
      return false;
    }
  });
  
  // Now you can use it directly in your condition
  if (isAuthenticated === "true") {
    return <Outlet />;
  }

  // Render the friendly message if not authenticated
  return (
    <div className="protected-route-container">
      <img
        src={placeholderImage}
        alt="Lonely Illustration"
        className="protected-route-image"
      />
      <h2 className="protected-route-message">It's lonely here!</h2>
      <p className="protected-route-description">
        Why not{" "}
        <button className="linkBtn">
          <Link to="/vendor/signup" className="lintText">
            sign up
          </Link>
        </button>{" "}
        or{" "}
        <button className="linkBtn">
          <Link to="/vendor/login" className="lintText">
            log in
          </Link>
        </button>{" "}
        to get the action going?
      </p>
    </div>
  );
};

export default ProtectedRoute;
